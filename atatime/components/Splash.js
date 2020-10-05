import * as React from 'react';
import {View, Text } from 'react-native';

function Splash({navigation}) {

    setTimeout(() =>{
        navigation.replace('Login');
    }, 4000);

  return (
    <View style={{backgroundColor: '#F05F40', flex:1, justifyContent:'center', alignItems:'center'}}>

        <Text style={{color: 'white', fontSize: 40, fontWeight:"bold"}}>
           @@time
        </Text>

    </View>
  );
}

export default Splash;