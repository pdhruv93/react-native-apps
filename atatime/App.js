/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './components/Splash';
import LoginScreen from './components/LoginScreen';
import MainScreenWrapper from './components/MainScreenWrapper';
import messaging from '@react-native-firebase/messaging';


export default App = () => {


// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>

          <Stack.Screen name="Splash" component={Splash}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="MainScreenWrapper" component={MainScreenWrapper}/>

        </Stack.Navigator>
    </NavigationContainer>    
  );
};