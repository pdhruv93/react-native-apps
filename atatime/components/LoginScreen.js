import React, {Component} from 'react';
import {Dimensions,StyleSheet,Text,View} from 'react-native';
import {AccessToken} from 'react-native-fbsdk';


import FBLoginButton from './FBLoginButton';

function LoginScreen({navigation}) {
  
  setTimeout(() =>{

      AccessToken.getCurrentAccessToken()
      .then(data => {
       if(data!=null)
       {
         console.log('User has correct access Token Redirecting to MainScreenWrapper!!! Response');
         navigation.replace('MainScreenWrapper');
       }
      });

    } , 1000);



  return (

      <View style={[styles.screen, styles.aboutScreen]}>

        <Text style={{fontSize: 32, color:"white"}}>
          We've got what you need!  
        </Text>
        
        <Text style={{fontSize: 16, color:"rgba(255, 255, 255, 0.7)", textAlign: "center", margin: 20}}>
          mark your current activity with Tags. and check how many others are doing the same activity...And thats it. @@time is ready!!
        </Text>
        

        <Text>{"\n"}</Text>
        
        <FBLoginButton navigation={navigation}/>

      </View>
  
  );
};



const styles = StyleSheet.create({

  screen: {
    flexDirection: 'column', 
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutScreen: {
    backgroundColor: '#F05F40',
  }

});

export default LoginScreen;