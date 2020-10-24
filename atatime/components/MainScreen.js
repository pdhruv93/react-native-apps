import React, {createContext, useState, useContext, useRef} from 'react';
import {Text, View, Linking} from 'react-native';
import { Button, TextInput } from 'react-native-paper';

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

  const screenNameRef=useRef();


  const saveScreenNameToFirebase = () =>{
    console.log("Updating screenName which user has entered to Firebase Database...");
    database().ref('/user/'+userId)
    .update(
      {
        screenName: screenNameRef.current.value
      }
    )
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
        <TextInput type="outlined" ref={screenNameRef} style={{width: "60%" }} value={userDetails.screenName} onChangeText={text => {screenNameRef.text=text} } />


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