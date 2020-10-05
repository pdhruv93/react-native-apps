import React, { Component } from 'react';
import { View } from 'react-native';
import {LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';

export default FBLoginButton = (props) => {


  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      alert(JSON.stringify(result));
      this.setState({ user_name: 'Welcome' + ' ' + result.name });
      this.setState({ token: 'User Token: ' + ' ' + result.id });
      this.setState({ profile_pic: result.picture.data.url });
    }
  };





    return (
      <>
        <LoginButton
          publishPermissions={["email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {


                AccessToken.getCurrentAccessToken().then(data => {
  
                  const processRequest = new GraphRequest(
                    '/me?fields=name,picture.type(large)',
                    null,
                    get_Response_Info()
                  );
                  // Start the graph request.
                  new GraphRequestManager().addRequest(processRequest).start();
                });



                props.navigation.replace('MainScreenWrapper');
              }
            }
          }
          onLogoutFinished={() => {
            props.navigation.replace('Login');
          }
          }/>
      </>
    );
};