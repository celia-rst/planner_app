import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccordionItem = ({ title, content }) => {
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
          <Text style={styles.contentText}>{content}</Text>
        </View>
      )}
    </View>
  );
};

const TodoScreen = () => (
  <View style={styles.screen}>
    <AccordionItem
      title="INBOX"
      content="This is the content of section 1."
    />
    <AccordionItem
      title="PERSONNAL"
      content="This is the content of section 2."
    />
    <AccordionItem
      title="WORK"
      content="This is the content of section 3."
    />
    <AccordionItem
      title="LIFE BALANCE"
      content="This is the content of section 3."
    />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff'
  },
  container: {
    margin: 0,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomLeftRadius: 50
  },
  contentText: {
    paddingLeft: 20,
    fontSize: 16
  }
});

export default TodoScreen;
