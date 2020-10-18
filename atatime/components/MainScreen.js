import React, {createContext, useState} from 'react';
import {Dimensions, StyleSheet,Text,TouchableOpacity,View, Linking} from 'react-native';

import { Button, Switch} from 'react-native-paper';
import FBLoginButton from './FBLoginButton';
import ActivitiesList from './ActivitiesList';
import ActivityViewer from './ActivityViewer';
import database from '@react-native-firebase/database';

export const ActivityContext = createContext();

export default MainScreen = (props)=> {

  const [chatSwitchState, setChatSwitchState] = useState(true);
  const [locationSwitchState, setLocationSwitchState] = useState(true);
  const [notificationSwitchState, setNotificationSwitchState] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState('0');


  scrollToActivityTagScreen = () =>{
    props.scrollRef.current?.scrollTo({x: 0, y: 0});
  };


  const setActivity = (activity) =>{
    setSelectedActivity(activity);
  } 


  const onToggleChatSwitch = () => {
    let temp=!chatSwitchState;

    database().ref('/user/'+props.userDetails.id).update({
      allowChat: temp
    })
    .then(()=>{
      setChatSwitchState(temp);
    })
  }


  const onToggleLocationSwitch = () => {
    let temp=!locationSwitchState;
    
    database().ref('/user/'+props.userDetails.id).update({
      showLocation: temp
    })
    .then(()=>{
      setLocationSwitchState(temp);
    })
  }


  const onToggleNotificationSwitch = () => {
    let temp=!notificationSwitchState;
    
    database().ref('/user/'+props.userDetails.id).update({
      sendNotifications: temp
    })
    .then(()=>{
      setNotificationSwitchState(temp);
    })
  }

 
  return (
    
      <>
      <ActivityContext.Provider value={{setActivity}}>
        <View style={[styles.screen, styles.activityTagScreen]}>
          <Text style={{fontSize: 32, color:"white"}}>
          Tag your activities
          </Text>
        
          <Text style={{fontSize: 16, color:"rgba(255, 255, 255, 0.7)"}}>
            choose the tag which closely relates to your activity
          </Text>
          
          
            <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent: 'space-evenly', padding: 20}}>
              <ActivitiesList scrollRef={props.scrollRef} userDetails={props.userDetails} />
            </View>
        </View>



        <View style={[styles.screen, styles.activityViewerScreen]}>
          
          <ActivityViewer selectedActivity={selectedActivity} userDetails={props.userDetails}></ActivityViewer>
         
          <Text>{"\n"}</Text>

          <Button color="white" mode="contained" style={styles.scrollButton} onPress={scrollToActivityTagScreen}>
            Cool!! Tag More Activities
          </Button>
        </View>


        <View style={[styles.screen, styles.profileScreen]}>
          <Text style={{fontSize: 32, color:"white"}}>
            Profile and Preferences
          </Text>
          <Text>{"\n"}</Text>

          <Text style={{fontSize: 16, color:"white"}}>Want others to chat with you?</Text>
          <Switch value={chatSwitchState} onValueChange={onToggleChatSwitch}></Switch>

          <Text>{"\n"}</Text>

          <Text style={{fontSize: 16, color:"white"}}>Want others to view your location?</Text>
          <Switch value={locationSwitchState} onValueChange={onToggleLocationSwitch}></Switch>

          <Text>{"\n"}</Text>

          <Text style={{fontSize: 16, color:"white"}}>Send Notifications?</Text>
          <Switch value={notificationSwitchState} onValueChange={onToggleNotificationSwitch}></Switch>

          <Text>{"\n"}</Text>
          <Text style={{fontSize: 14, color:"white"}}>if you are disabling some feature for yourself, {"\n"} you cannot access that for others too!!</Text>
          

          <Text>{"\n"}</Text>
          <FBLoginButton navigation={props.navigation} userDetails={props.userDetails}/>

          <Text>{"\n"}</Text>

          <Button icon="heart" mode="contained" onPress={() => Linking.openURL('https://m.me/greenpandey')} >
             Say Hi to Developer
          </Button>

        </View>
      </ActivityContext.Provider>

    </>

  
  );
};






const styles = StyleSheet.create({

  screen: {
    flexDirection: 'column', 
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityTagScreen: {
    backgroundColor: '#F05F40',
  },
  activityViewerScreen: {
    backgroundColor: '#007bff',
  },
  profileScreen: {
    backgroundColor: '#F05F40',
  },

  scrollButton : {
    textTransform: 'uppercase',
    borderRadius: 300,
    padding: 15,
    minWidth: "50%",
    marginTop: 30
  },

});