import React, {useContext} from 'react';
import {LoginButton} from 'react-native-fbsdk';
import database from '@react-native-firebase/database';


export default FBLoginButton = (props) => {


  return(
    <LoginButton 
      publishPermissions={["email"]}
      onLoginFinished=
      {
        (error, result) => {
          if (error) {
            alert("Login failed with error: " + error.message);
            console.log("User pressed Login Button and landed upto error"+JSON.stringify(error));
          } 
          else if (result.isCancelled) {
            alert("User pressed Login Button and then somehow Login was cancelled");
            console.log("User pressed Login Button and then somehow Login was cancelled");
          } 
          else{
            console.log("User pressed Login Button and login was successful!!");
          }
        }
      }


      onLogoutFinished=
      {
        () => {
          console.log("User is logging out!!");
          database().ref('/user/'+props.userDetails.userId).update({
            deviceId: ""
          })
          .then(()=>{
            console.log("Device Id Unregisetered!!");
            props.navigation.replace('Login');
          })
        }
      }

      
    />

  )
}