import React,{useRef, useState, useEffect} from 'react';
import {StatusBar,StyleSheet,ScrollView, Alert} from 'react-native';
import MainScreen from './MainScreen';
import Header from './Header';
import {AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';

export default MainScreenWrapper = ({navigation}) => {

  console.log("!!!!Inside MainScreenWrapper!!!!");

  const scrollRef=useRef();

  const [areUserDetailsFetched, setAreUserDetailsFetched] = useState(false);
  const [userDetails, setuserDetails] = useState([]);


  get_Response_Info = (error, result) => {
    if(!error)
    {
      
      console.log("Checking if there is some DeviceID associated with the Logged in user for Push Notifiaction...")
      database()
      .ref('/user/'+result.id+"/deviceId")
      .once('value')
      .then(snapshot => {
        console.log('Device Id: ', snapshot.val());
          if(snapshot.val()=="")
          {
            console.log("There is no Device ID for this user. Registering new!!");
            // Register the device with FCM
              messaging().registerDeviceForRemoteMessages()
              .then(()=>{
                
                // Get the token
                messaging().getToken()
                .then((token)=>{
                  console.log(token);
                  database().ref('/user/'+result.id).update({
                    deviceId: token
                  })
                  .then(()=>{
                    console.log("Device Id Linked!!");
                  })


                })

              })
          }

      });

      
      
      
      setuserDetails(result);
      setAreUserDetailsFetched(true);
    }
  };


  useEffect(() => {
    
    AccessToken.getCurrentAccessToken()
    .then(data => {
      
      const processRequest = new GraphRequest(
        '/me?fields=name,picture.type(large)',
        null,
        get_Response_Info
      )
      // Start the graph request(sync call).
      new GraphRequestManager().addRequest(processRequest).start();
      })
      .catch(()=>{
      });


  }, []);

  

 if(areUserDetailsFetched==true){

    return(

      <ScrollView style={styles.container} ref={scrollRef} stickyHeaderIndices={[1]}>
            <StatusBar barStyle="dark-content" />
            <Header scrollRef={scrollRef} userDetails={userDetails}></Header>
            <MainScreen scrollRef={scrollRef} navigation={navigation} userDetails={userDetails}></MainScreen>
        </ScrollView>
    );

  }

    return(
      <></>
    )





  
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});