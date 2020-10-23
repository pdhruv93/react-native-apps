import React, {useContext} from 'react';
import {Dimensions, TouchableHighlight} from 'react-native';
import { Appbar, Avatar} from 'react-native-paper';

import { UtilityContext } from './MainScreenWrapper';
import {styles} from './StyleSheet';



export default Header = (props) => {

  console.log("!!!!!Inside Header File!!!!!");

  let {scrollRef, userDetails}=useContext(UtilityContext);

  return (
    
    <Appbar.Header style={[styles.whiteBackground]}>
      <Appbar.Action icon="home" onPress={()=>{scrollRef.current?.scrollTo({x: 0, y: 0})}} color='#F05F40'/>
      <Appbar.Content title="@@time" color='#F05F40'/>

      <TouchableHighlight onPress={()=>scrollRef.current?.scrollTo({x: 0, y: (Dimensions.get('window').height)*2 })}  >
        <Avatar.Image size={30} source={{uri: userDetails.profilePicURL}}/>
      </TouchableHighlight>

    </Appbar.Header>
  );
};