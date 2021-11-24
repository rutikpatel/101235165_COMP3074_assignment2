import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './screens/MainScreen.jsx';
import AboutScreen from './screens/AboutScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Main"
          options={{ drawerLabel: 'Main' }}
          component={MainScreen} />
        <Drawer.Screen
          name="About"
          options={{ drawerLabel: 'About' }}
          component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}