import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import TodayScreen from '../screens/TodayScreen';
import ThisWeekScreen from '../screens/ThisWeekScreen';
import ThisMonthScreen from '../screens/ThisMonthScreen';
import TodoScreen from '../screens/TodoScreen';
import ReviewScreen from '../screens/ReviewScreen';
import CategoriesScreen from '../screens/CategoriesScreen';


const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [activeTab, setActiveTab] = useState('Today');
  const [previousTab, setPreviousTab] = useState(null); // Nouvel état pour l'onglet précédent
  const [visibleTabs, setVisibleTabs] = useState({
    Today: true,
    ThisWeek: false,
    ThisMonth: false,
    Todo: true,
    Review: true,
    Categories:true
  });

  const navigation = useNavigation();

  // Fonction pour ouvrir le menu tiroir
  const openDrawer = () => {
    navigation.openDrawer();
  };

  // Fonction pour gérer le changement de tab et la visibilité
  const handlePlannerNavigation = (previousTab) => {
    console.log(`previousTab = "${previousTab}"`);
    if (previousTab === null || previousTab === 'SwitchTab')
      {
        if (activeTab === 'Today') {
          setActiveTab('ThisWeek');
          setVisibleTabs({ Today: false, ThisWeek: true, ThisMonth: false, Todo: true, Review: true, Categories:true});
        } else if (activeTab === 'ThisWeek') {
          setActiveTab('ThisMonth');
          setVisibleTabs({ Today: false, ThisWeek: false, ThisMonth: true, Todo: true, Review: true, Categories:true});
        } else if (activeTab === 'ThisMonth') {
          setActiveTab('Today');
          setVisibleTabs({ Today: true, ThisWeek: false, ThisMonth: false, Todo: true, Review: true, Categories:true});
        }
    }
  };

  const handleNavigation = (routeName) => {
    console.log(`Onglet "${routeName}" cliqué`);
    setPreviousTab(routeName);
    navigation.navigate(routeName);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 80,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={openDrawer} style={{ padding: 10 }}>
            <Image
              source={require('../assets/icons/burger-menu.png')}
            />
          </TouchableOpacity>
        ),
        tabBarButton: (props) => {
          if (route.name === 'SwitchTab') {
            console.log(`activeTab = "${activeTab}\n"`);
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { handlePlannerNavigation(previousTab); handleNavigation(route.name);}} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={
                      activeTab === 'Today'
                        ? require('../assets/icons/today.png')
                        : activeTab === 'ThisWeek'
                        ? require('../assets/icons/this-week.png')
                        : require('../assets/icons/this-month.png')
                    }
                    style={{ width: 30, height: 30, tintColor: props.accessibilityState.selected ? '#EF3B3B' : props.color }}
                  />
                  <Text style={{ color: props.accessibilityState.selected ? '#EF3B3B' : props.color }}>
                    {activeTab === 'Today' ? 'Today' : activeTab === 'ThisWeek' ? 'This Week' : 'This Month'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
          return (
              <TouchableOpacity {...props} onPress={() => handleNavigation(route.name)}/>
          )
        },
      })}
    >
      <Tab.Screen
        name="SwitchTab"
        component={
          activeTab === 'Today'
            ? TodayScreen
            : activeTab === 'ThisWeek'
            ? ThisWeekScreen
            : ThisMonthScreen
        }
        options={{
          title: activeTab === 'Today' ? 'Today' : activeTab === 'ThisWeek' ? 'This Week' : 'This Month',
        }}
      />

      {visibleTabs.Todo && (
        <Tab.Screen
          name="Todo"
          component={TodoScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('../assets/icons/todo.png')}
                  style={{ width: 30, height: 30, tintColor: focused ? '#EF3B3B' : color }}
                />
                <Text style={{ color: focused ? '#EF3B3B' : color }}>
                  To-do
                </Text>
              </View>
            ),
          }}
        />
      )}

      {visibleTabs.Review && (
        <Tab.Screen
          name="Review"
          component={ReviewScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('../assets/icons/review.png')}
                  style={{ width: 30, height: 30, tintColor: focused ? '#EF3B3B' : color }}
                />
                <Text  style={{ color: focused ? '#EF3B3B' : color }}>
                  Review
                </Text>
              </View>
            ),
          }}
        />
      )}

      {visibleTabs.Categories && (
        <Tab.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('../assets/icons/categories.png')}
                  style={{ width: 30, height: 30, tintColor: focused ? '#EF3B3B' : color }}
                />
                <Text  style={{ color: focused ? '#EF3B3B' : color }}>
                  Categories
                </Text>
              </View>
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export default TabNavigator;
