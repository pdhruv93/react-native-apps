import React, {useState} from 'react';
import {Text} from 'react-native';
import database from '@react-native-firebase/database';




export default ActivityViewer = (props)=> {

    console.log("!!!!Inside ActivityViewer Screen!!!!");

    return(
        <>
            <Text>{props.selectedActivity}</Text>

           
        </>
    )

}