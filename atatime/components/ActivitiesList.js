import React, {useState, useEffect, useContext } from 'react';
import {Text, Dimensions} from 'react-native';
import {Chip} from 'react-native-paper';

import database from '@react-native-firebase/database';

import {ActivityContext} from './MainScreen';
import { UtilityContext } from './MainScreenWrapper';
import {styles} from './StyleSheet';


export default ActivitiesList = (props)=> {

    console.log("!!!!Inside Activity List Screen!!!!");

    const [activitiesFetchedFromDB, setActivitiesFetchedFromDB] = useState([]);

    const {setSelectedActivity}=useContext(ActivityContext);
    let {scrollRef}=useContext(UtilityContext);


    useEffect(() => {
        console.log("Getting acitivity tags list from Firebase!!");
        database().ref('/activities')
        .once('value', (snapshot) => {
            let data = snapshot.val();
            setActivitiesFetchedFromDB(data);
        })

    }, []);



    if(activitiesFetchedFromDB!=null && Object.keys(activitiesFetchedFromDB).length>0 ){
        return(
            Object.keys(activitiesFetchedFromDB).map(key => 
                <Chip key={key} style={[ { backgroundColor: activitiesFetchedFromDB[key].color }, {margin: 5} ]} 
                    textStyle={styles.boldText} 
                    onPress={ ()=> {  
                        scrollRef.current?.scrollTo({x: 0, y: (Dimensions.get('window').height)*1 });
                        setSelectedActivity(key) 
                    }} 
                >
                    {key}
                </Chip>
            )
        );
    }


    return(
        <>
            <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
                fetching activity list specially meant for you..
             </Text>
        </>
    )

}