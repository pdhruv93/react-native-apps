import React,{useRef, useState, useEffect, createContext} from 'react';
import {StatusBar,ScrollView, Text, View} from 'react-native';

import Header from './Header';
import MainScreen from './MainScreen';
import {styles} from './StyleSheet';

import {AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';


export const UtilityContext = createContext();

export default MainScreenWrapper = (props) => {

  console.log("!!!!Inside MainScreenWrapper!!!!");

  const scrollRef=useRef();
  const [userDetails, setuserDetails] = useState([]);

  let userId="", userName="", profilePicURL="", deviceId="", screenName=""; //FB API has discontinued returning screenName. So need to fetch from Firebase.



  const updateDetailsToFirebaseAndCreateLocalUser = () =>{

    console.log("Updating userName,ProfilePicURL,deviceId to Firebase..screenName will be updated by user manually in Profile section");
    database().ref('/user/'+userId)
    .update(
      {
        userName: userName, profilePicURL: profilePicURL, deviceId: deviceId 
      }
    )

    console.log("Fetched all user parameters. Creating User object for local usage with App!!!");
    setuserDetails({userId: userId, userName: userName, profilePicURL: profilePicURL, deviceId:deviceId, screenName:screenName  });

  }


  

  fetchUserDetailsFromFacebook = (error, result) => {
    console.log("Fetching User details for the current user from Facebook API!!!");

    if(!error)
    {
      userId=result.id;
      userName=result.name;
      profilePicURL= result.picture.data.url;
      deviceId="";
      screenName=""; //FB API has discontinued returning screenName. So need to fetch from Firebase.
      
      console.log("Checking if userId "+userId+" exists in Firebase Database...");
      database().ref('/user/'+userId)
      .once('value')
      .then(snapshot => {
        if(snapshot.val()==null)
        {
          console.log("The user does not exists in Firebase Database. Creating new user with empty data...");
          database().ref('/user/'+userId)
          .set(
            {
              userName:"", profilePicURL:"", deviceId:"", screenName:"" 
            }
          )
        }
        else
        {
          console.log("The user already exists in Firebase Database. Not creating new");

          console.log("Getting screenName for the current logged in user...");
          screenName=snapshot.val().screenName;

          console.log("Checking if there is some DeviceID associated with the Logged in user for Push Notifiaction...");

          if(snapshot.val().deviceId=="")
          {
            console.log("There is no Device ID for this user. Registering new!!");
            // Register the device with FCM
            messaging().registerDeviceForRemoteMessages()
            .then(()=>{
              
              messaging().getToken()
              .then((token)=>{
                console.log("New Device ID recieved from mesaaging system:"+token);
                deviceId=token;
                updateDetailsToFirebaseAndCreateLocalUser();
              })
  
            })
          }
          else
          {
            deviceId=snapshot.val();
            updateDetailsToFirebaseAndCreateLocalUser();
          }
        }

      });
    }
  };


  useEffect(() => {
    
    AccessToken.getCurrentAccessToken()
    .then(data => {
      
      const processRequest = new GraphRequest('/me?fields=name,picture.type(large)',null,fetchUserDetailsFromFacebook);

      // Start the graph request(sync call).
      new GraphRequestManager().addRequest(processRequest).start();
    })


  }, []);


 if(userDetails!=null && Object.keys(userDetails).length>0){
    return(
      <UtilityContext.Provider value={{scrollRef, userDetails}} >
        <ScrollView ref={scrollRef} stickyHeaderIndices={[1]}>
            <StatusBar barStyle="dark-content" />
            <Header/>
            <MainScreen navigation={props.navigation}/>
        </ScrollView>
      </UtilityContext.Provider>
    );

  }


  return(
    <View style={[styles.screen, styles.redBackground]}>
      <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
        wait while we cook the user for you....
      </Text>
    </View>
  )

 
};