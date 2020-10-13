import React, { Component } from 'react';
import { View } from 'react-native';
import {LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';

export default FBLoginButton = (props) => {

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
                props.navigation.replace('MainScreenWrapper');
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