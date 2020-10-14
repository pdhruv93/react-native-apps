import React, { Component } from 'react';
import { View } from 'react-native';
import {LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import database from '@react-native-firebase/database';

export default FBLoginButton = (props) => {


  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      console.log(error);
      Alert.alert('Error fetching data: ' + error.toString());
    } else 
    {

        database().ref('/user/'+result.id).set({
          name: result.name,
          profilePicURL: result.picture.data.url
        })
        .then(data =>{
          console.log("User inserted in Database");
        });



      database().ref('/userPreferences/'+result.id).set({
        allowChat: true,
        showLocation: true
      })
      .then(data =>{
        console.log("User Preferences inserted in Database");
      });



    }
  };






      return (
      <>

        <LoginButton publishPermissions={["email"]}

          onLoginFinished={

            (error, result) => {
              console.log(error);
              console.log(result);
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {



                AccessToken.getCurrentAccessToken()
                .then(data => {
                  const processRequest = new GraphRequest(
                    '/me?fields=name,picture.type(large)',
                    null,
                    get_Response_Info
                  )
                  // Start the graph request(sync call).
                  new GraphRequestManager().addRequest(processRequest).start();

                  props.navigation.replace('MainScreenWrapper');
                  })
                  .catch(()=>{
                  });



              }
            }

          }


          onLogoutFinished={

            () => {
              props.navigation.replace('Login');
            }

          }

        />


      </>
    );
};