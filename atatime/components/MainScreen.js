import React, {createContext, useState, useContext, useRef} from 'react';
import {Text, View, Linking} from 'react-native';
import { Button } from 'react-native-paper';
import DelayInput from "react-native-debounce-input";

import FBLoginButton from './FBLoginButton';
import database from '@react-native-firebase/database';

import ActivitiesList from './ActivitiesList';
import ActivityViewer from './ActivityViewer';
import {styles} from './StyleSheet';
import { UtilityContext } from './MainScreenWrapper';


export const ActivityContext = createContext();


export default MainScreen = (props)=> {

  let {scrollRef, userDetails}=useContext(UtilityContext);
  const[selectedActivity, setSelectedActivity] = useState("");
  const [screenNameInputValue, setScreenNameInputValue] = useState(userDetails.screenName);


  const saveScreenNameToFirebase = (newValue) =>{
    console.log("Updating screenName "+newValue+" which user has entered to Firebase Database...");
    database().ref('/user/'+userDetails.userId)
    .update(
      {
        screenName: newValue
      }
    )
    .then(()=>{
      console.log("Updated new screenName to Firebase DB!!");
      setScreenNameInputValue(newValue);
    })
  }
 

  return(
    <ActivityContext.Provider value={{selectedActivity, setSelectedActivity}}>



      <View style={[styles.screen, styles.redBackground]}>
        <Text style={[styles.text, styles.whiteText, styles.boldText, {fontSize: 32}]} >
          Tag your activities
        </Text>
        
        <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
          choose the tag which closely relates to your activity
        </Text>
        
        <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent: 'space-evenly', padding: 20}}>
          <ActivitiesList/>
        </View>
          
        <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent: 'space-evenly', padding: 20}}>    
        </View>
      </View>




      <View style={[styles.screen, styles.blueBackground]}>
        <Text>{"\n"}</Text>
          
        <ActivityViewer/>
        
        <Button color="white" mode="contained" style={styles.scrollButton} onPress={()=>{scrollRef.current?.scrollTo({x: 0, y: 0})}} >
          Cool!! Tag More Activities
        </Button>

      </View>




      <View style={[styles.screen, styles.redBackground]}>
        <Text style={[styles.text, styles.whiteText, styles.boldText, {fontSize: 32}]}>
          Profile and Preferences
        </Text>

        
        <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
          provide your username to let other users connect you on messenger
          (app restart needed after save)  
        </Text>
        
        <DelayInput
          value={screenNameInputValue}
          minLength={5}
          onChangeText={value => saveScreenNameToFirebase(value)}
          delayTimeout={1000}
          style={{ margin: 10, height: 40, width: 200, borderColor: "white", borderWidth: 1, color: "white" }}
        />


        <Text>{"\n\n\n\n"}</Text>
        <FBLoginButton navigation={props.navigation} userDetails={userDetails} />
        <Text>{"\n"}</Text>
        <Button icon="heart" mode="contained" onPress={() => Linking.openURL('https://m.me/greenpandey')} >
          Say Hi to Developer
        </Button>

      </View>




    </ActivityContext.Provider>

  
  );
};