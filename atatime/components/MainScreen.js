import React, {Component} from 'react';
import {Dimensions, Platform,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Button, Chip } from 'react-native-paper';

export default MainScreen = (props) => {
  
  scrollToB = () =>{
    props.scrollRef.current?.scrollTo({x: 0, y: props.screenHeight*1});
  };

  scrollToC = () =>{
    props.scrollRef.current?.scrollTo({x: 0, y: props.screenHeight*2});
  };


  return (
    
      <>

      <View style={[styles.screen, styles.aboutScreen]}>

        <Text style={{fontSize: 32, color:"white"}}>
        We've got what you need!
        </Text>
        
        <Text style={{fontSize: 16, color:"rgba(255, 255, 255, 0.7)"}}>
          mark your current activity with Tags.
        </Text>
        <Text style={{fontSize: 16, color:"rgba(255, 255, 255, 0.7)"}}>
          and check how many others are doing the same activity
        </Text>
        <Text style={{fontSize: 16, color:"rgba(255, 255, 255, 0.7)"}}>
        And thats it. @@time is ready!!
        </Text>

        <Button  color="white" mode="contained" style={styles.scrollButton} onPress={scrollToB}>
          Can't Wait.Start Here!!!
        </Button>
      </View>


      <View style={[styles.screen, styles.activityTagScreen]}>
        <Text style={{fontSize: 32, color:"white"}}>
        Tag your activities
        </Text>
      
        <Text style={{fontSize: 16, color:"rgba(255, 255, 255, 0.7)"}}>
          choose the tag which closely relates to your activity
        </Text>
        
        <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent: 'space-evenly', padding: 20}}>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#ffc107'}]} textStyle={{fontWeight: 'bold'}} onPress={scrollToC}>sleeping</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#ffc107'}]} textStyle={{fontWeight: 'bold'}}>running</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#ffc107'}]} textStyle={{fontWeight: 'bold'}}>walking</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#ffc107'}]} textStyle={{fontWeight: 'bold'}}>yawning</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#ffc107'}]} textStyle={{fontWeight: 'bold'}}>driving</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#ffc107'}]} textStyle={{fontWeight: 'bold'}}>cooking</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#ffc107'}]} textStyle={{fontWeight: 'bold'}}>travelling</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#28a745'}]} textStyle={{fontWeight: 'bold'}}>@office</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#28a745'}]} textStyle={{fontWeight: 'bold'}}>@home</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#28a745'}]} textStyle={{fontWeight: 'bold'}}>@gym</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#28a745'}]} textStyle={{fontWeight: 'bold'}}>@spa</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#dc3545'}]} textStyle={{fontWeight: 'bold'}}>fb</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#dc3545'}]} textStyle={{fontWeight: 'bold'}}>instagram</Chip>
          <Chip style={[styles.chipStyle,{ backgroundColor: '#dc3545'}]} textStyle={{fontWeight: 'bold'}}>twitter</Chip>
        </View>
      </View>



      <View style={[styles.screen, styles.activityViewerScreen]}>
        <Text>
            A
        </Text>
        <Button color="white" mode="contained" style={styles.scrollButton} onPress={scrollToB}>
          Cool!! Tag More Activities
        </Button>
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
  aboutScreen: {
    backgroundColor: '#F05F40',
  },
  activityTagScreen: {
    backgroundColor: '#007bff',
  },
  activityViewerScreen: {
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