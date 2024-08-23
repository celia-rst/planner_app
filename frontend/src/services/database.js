import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'TodoDB',
    location: 'default',
  },
  () => { console.log('Database opened'); },
  error => { console.error('Error opening database:', error); }
);

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        completed INTEGER
      );`,
      [],
      () => { console.log('Table created successfully'); },
      error => { console.error('Error creating table:', error); }
    );
  });
};

/**
 * Callback function used to update the user interface. 
 * It retrieves the list of tasks from the database and update their state.
 * @param {*} setTasksByCategory 
 */
export const fetchTasks = (setTasksByCategory) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM tasks;',
      [],
      (tx, results) => {
        const rows = results.rows.raw();
        const newTasksByCategory = {
          INBOX: [],
          PERSONAL: [],
          WORK: [],
          'LIFE BALANCE': [],
        };

        rows.forEach(task => {
          newTasksByCategory[task.category].push({
            id: task.id,
            title: task.title,
            completed: !!task.completed, // convert in boolean
          });
        });

        setTasksByCategory(newTasksByCategory);
      },
      error => { console.error('Error fetching tasks:', error); }
    );
  });
};

export const addTask = (title, category, fetchTasks) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO tasks (title, category, completed) VALUES (?, ?, ?);',
      [title, category, 0],
      () => {
        fetchTasks(); // Recharger les tâches après l'insertion
      },
      error => { console.error('Error inserting task:', error); }
    );
  });
};

export const toggleTaskCompletion = (taskId, newCompletedStatus, fetchTasks) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE tasks SET completed = ? WHERE id = ?;',
      [newCompletedStatus, taskId],
      () => {
        fetchTasks(); // Recharger les tâches après la mise à jour
      },
      error => { console.error('Error updating task:', error); }
    );
  });
};
