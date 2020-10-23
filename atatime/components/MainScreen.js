import React, {createContext, useState, useContext} from 'react';
import {Dimensions, Text,TouchableOpacity,View, Linking} from 'react-native';
import { Button} from 'react-native-paper';

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
 

  return(
    <ActivityContext.Provider value={{setSelectedActivity}}>



      <View style={[styles.screen, styles.blueBackground]}>
        <Text style={[styles.text, styles.whiteText, styles.boldText, {fontSize: 32}]} >
          Tag your activities
        </Text>
        
        <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
          choose the tag which closely relates to your activity
        </Text>
          
          
        <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent: 'space-evenly', padding: 20}}>    
        </View>
      </View>




      <View style={[styles.screen, styles.redBackground]}>
        <Text>{"\n"}</Text>

        <Button color="white" mode="contained" style={styles.scrollButton} onPress={()=>{scrollRef.current?.scrollTo({x: 0, y: 0})}} >
          Cool!! Tag More Activities
        </Button>

      </View>




      <View style={[styles.screen, styles.blueBackground]}>
        <Text style={[styles.text, styles.whiteText, styles.boldText, {fontSize: 32}]}>
          Profile and Preferences
        </Text>

        <Text>{"\n\n"}</Text>

        <FBLoginButton navigation={props.navigation} userDetails={userDetails} />

        <Button icon="heart" mode="contained" onPress={() => Linking.openURL('https://m.me/greenpandey')} >
          Say Hi to Developer
        </Button>

      </View>




    </ActivityContext.Provider>

  
  );
};