import React, {Component, useState} from 'react';
import {Dimensions, Platform,StyleSheet,Text,TouchableOpacity,View} from 'react-native';

import { Button, Chip} from 'react-native-paper';
import FBLoginButton from './FBLoginButton';

import ActivitiesList from './ActivitiesList';


export default MainScreen = (props)=> {

  scrollToActivityTagScreen = () =>{
    props.scrollRef.current?.scrollTo({x: 0, y: 0});
  };

 
  return (
    
      <>
      <View style={[styles.screen, styles.activityTagScreen]}>
        <Text style={{fontSize: 32, color:"white"}}>
        Tag your activities
        </Text>
      
        <Text style={{fontSize: 16, color:"rgba(255, 255, 255, 0.7)"}}>
          choose the tag which closely relates to your activity
        </Text>
        
        <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent: 'space-evenly', padding: 20}}>
          <ActivitiesList scrollRef={props.scrollRef} />
        </View>


      </View>



      <View style={[styles.screen, styles.activityViewerScreen]}>
        <Text>
            A
        </Text>
        <Button color="white" mode="contained" style={styles.scrollButton} onPress={scrollToActivityTagScreen}>
          Cool!! Tag More Activities
        </Button>
      </View>


      <View style={[styles.screen, styles.profileScreen]}>
        <Text style={{fontSize: 32, color:"white"}}>
           Profile and Preferences
        </Text>
        <Text>{"\n"}</Text>
        <FBLoginButton navigation={props.navigation}/>
      </View>


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

  chipStyle:{
    margin: 5,
  }

});