import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './components/Splash';
import LoginScreen from './components/LoginScreen';
import MainScreenWrapper from './components/MainScreenWrapper';

import messaging from '@react-native-firebase/messaging';


export default App = () => {

  console.log("Main App Component Loaded!!!");

  useEffect(()=>{
    console.log("Registering App for recieving background push notifications from Firebase!!");
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, [])


  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>

          <Stack.Screen name="SplashScreen" component={Splash}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen}/>
          <Stack.Screen name="MainScreenWrapper" component={MainScreenWrapper}/>

        </Stack.Navigator>
    </NavigationContainer>    
  );

};