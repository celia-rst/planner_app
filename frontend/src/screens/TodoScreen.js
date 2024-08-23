import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  Pressable, 
  Animated,
  ScrollView
} from 'react-native';
import { createTables, fetchTasks, addTask } from '../services/database';

// sections styles
const AccordionItem = ({ title, tasks }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          {tasks.length > 0 ? (
              tasks.map((task) => (
                <Text key={task.id}>
                    {task.title}
                </Text>
              ))
            ) : (
              <Text style={styles.contentText}>No tasks available</Text>
          )}
        </View>
      )}
    </View>
  );
};

const TodoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('INBOX');
  const [showDropdown, setShowDropdown] = useState(false);
  const [tasksByCategory, setTasksByCategory] = useState({
    INBOX: [],
    PERSONAL: [],
    WORK: [],
    'LIFE BALANCE': [],
  });

  // animation setup
  const slideAnim = useRef(new Animated.Value(500)).current; // Start from below the screen
  const textInputRef = useRef(null);

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
  
      // Focus the TextInput when modal is visible
      setTimeout(() => {
        textInputRef.current.focus();
      }, 300); // Delay to ensure the modal is visible before focusing
    } else {
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  useEffect(() => {
    createTables();
    fetchTasks(setTasksByCategory); // Charger les tâches depuis la base de données
  }, []);

  // add the new task in the database and update the user interface with the callback function fetchTasks
  const handleAddTask = () => {
    if (taskTitle.trim()) {
      addTask(taskTitle, selectedCategory, () => fetchTasks(setTasksByCategory));
      setTaskTitle('');
      setModalVisible(false);
    }
    console.log('Task Added:', taskTitle);
  };

  // set the category of the task
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const categories = ['INBOX', 'PERSONAL', 'WORK', 'LIFE BALANCE'];
  const filteredCategories = categories.filter((category) => category !== selectedCategory); // return a list that contains all the values of "categories" except one of them specified by "selectedCategory"

  return (
    <View style={styles.screen}>
      <ScrollView>
        {categories.map(category => (
          <AccordionItem
            key={category}
            title={category}
            tasks={tasksByCategory[category]}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.plusSign}>
          <View style={styles.horizontalLine} />
          <View style={styles.verticalLine} />
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalBackground} onPress={() => { setModalVisible(false); setTaskTitle(''); }}>
          <Animated.View style={[styles.formContainer, { transform: [{ translateY: slideAnim }] }]}>
            <Pressable onPress={(e) => e.stopPropagation()}>

              {showDropdown && (
                <View style={styles.dropdownMenu}>
                  {filteredCategories.map((category) => (
                    
                    <TouchableOpacity
                      key={category}
                      style={styles.dropdownItem}
                      onPress={() => handleCategorySelect(category)}
                    >
                      <Text style={styles.dropdownItemText}>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              
              <TouchableOpacity
                style={[
                  styles.category,
                  {
                    borderTopLeftRadius: showDropdown ? 0 : styles.category.borderTopLeftRadius,
                    borderTopRightRadius: showDropdown ? 0 : styles.category.borderTopRightRadius,
                  },
                ]}
                onPress={() => setShowDropdown(!showDropdown)}
              >
                <Text style={styles.categoryTitle}>{selectedCategory}</Text>
              </TouchableOpacity>

              <View style={styles.formSubContainer}>
                <TextInput
                  ref={textInputRef}
                  style={styles.taskTitleInput}
                  placeholder="Add a new task"
                  value={taskTitle}
                  onChangeText={setTaskTitle}
                />
                <View style={styles.formBottomContainer}>
                  <View style={styles.tasksDetailsContainer}>
                    <TouchableOpacity style={styles.TaskDetailsItem}>
                      <Image source={require('../assets/icons/add-to-planner.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TaskDetailsItem}>
                      <Image source={require('../assets/icons/add-subtasks.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TaskDetailsItem}>
                      <Image source={require('../assets/icons/add-note.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TaskDetailsItem}>
                      <Image source={require('../assets/icons/add-appointment-time.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.submitButtonContainer}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleAddTask}>
                      <Text style={styles.submitButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    borderBottomWidth: 0.6,
    borderBottomColor: '#ccc',
  },
  header: {
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
    backgroundColor: '#fff',
  },
  contentText: {
    paddingLeft: 20,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -30 }],
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7070',
  },
  plusSign: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    position: 'absolute',
    width: 3,
    height: 32,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  verticalLine: {
    position: 'absolute',
    width: 32,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  formContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  category: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FF7070',
  },
  categoryTitle: {
    fontSize: 18,
    color: '#fff',
  },
  dropdownMenu: {
    borderRadius: 10,
    marginHorizontal: 20,
  },
  dropdownItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 18,
  },
  formSubContainer: {
    paddingHorizontal: 20,
  },
  taskTitleInput: {
    fontSize: 16,
    marginVertical: 20,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  formBottomContainer: {
    flexDirection: 'row',
  },
  tasksDetailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  TaskDetailsItem: {
    marginRight: 25,
    justifyContent: 'center',
  },
  submitButtonContainer: {
    marginLeft: 'auto',
    justifyContent: 'center',
    marginBottom: 10,
  },
  submitButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FF7070',
  },
  submitButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
});

export default TodoScreen;

