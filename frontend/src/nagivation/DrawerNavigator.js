import React from 'react';
import {Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import UserGuideScreen from '../screens/UserGuideScreen';
import FeedbackScreen from '../screens/FeedbackScreen';

const Drawer = createDrawerNavigator();

/**
 * @returns navigation component that manages the tabs of the application (Javascript XML)
*/
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ route, navigation }) => ({
        drawerStyle: {
          backgroundColor: '#fff'
        },
        headerShown: route.name === 'Settings' || route.name === 'User Guide' || route.name === 'Feedback',
        headerLeft: () => (
          <TouchableOpacity 
            onPress={()=>navigation.openDrawer()} 
            style={{ 
              padding: 10
            }}
          >
            <Image
              source={require('../../assets/icons/burger-menu.png')}
            />
          </TouchableOpacity>
        )
      })}
    >
      <Drawer.Screen 
        name="Home" 
        component={TabNavigator}
      />
      <Drawer.Screen
        name="User Guide"
        component={UserGuideScreen}
        options={{
          headerTitle: 'User Guide',
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          headerTitle: 'Feedback',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen} 
        options={{
          headerTitle: 'Settings',
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
