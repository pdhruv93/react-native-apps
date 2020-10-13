import * as React from 'react';
import {Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import { Appbar, Avatar} from 'react-native-paper';

export default Header = (props) => {

  const screenHeight= Dimensions.get('window').height;

  scrollToTop = () =>{
    console.log("Inside scrollToTop()");
    props.scrollRef.current?.scrollTo({x: 0, y: 0});
  };

  scrollToToProfileSection= () =>{
    props.scrollRef.current?.scrollTo({x: 0, y: screenHeight*2});
  };


  console.log("Inside Header File");

  return (
    
    <Appbar.Header style={styles.headerStyle}>
      <Appbar.Action icon="home" onPress={scrollToTop} color='#F05F40'/>
      <Appbar.Content title="@@time" color='#F05F40'/>

      <TouchableHighlight onPress={scrollToToProfileSection}>
        <Avatar.Image size={30} source={{uri: props.profilePicURL}}/>
      </TouchableHighlight>

    </Appbar.Header>
  );
};



const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: 'white',
    }

  });