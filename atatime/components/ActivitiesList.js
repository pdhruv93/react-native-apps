import React, {useState, useEffect, useContext } from 'react';
import {Dimensions} from 'react-native';

import {Chip} from 'react-native-paper';
import database from '@react-native-firebase/database';
import {ActivityContext} from './MainScreen';


export default ActivitiesList = (props)=> {

    console.log("!!!!Inside Activities Screen!!!!");

    const [activitiesFetchedFromDB, setActivitiesFetchedFromDB] = useState([]);
    const [areActivitiesFetchedFromDB, setAreActivitiesFetchedFromDB] = useState(true);

    const screenHeight= Dimensions.get('window').height;
    var activitiesRef= database().ref('/activities');

    const {setActivity}=useContext(ActivityContext);

    scrollToActivityViewerScreen = (activityKey) =>{
        setActivity(activityKey);
        props.scrollRef.current?.scrollTo({x: 0, y: screenHeight*1});
      };



      useEffect(() => {
    
        activitiesRef.on('value', (snapshot) => {

            let data = snapshot.val();

            setActivitiesFetchedFromDB(data);
            setAreActivitiesFetchedFromDB(true);
            })
    
      }, []);


    if(areActivitiesFetchedFromDB==true){

        return(

            Object.keys(activitiesFetchedFromDB).map(key => 
                <Chip key={key} style={[ { backgroundColor: activitiesFetchedFromDB[key].color }, {margin: 5} ]} textStyle={{fontWeight: 'bold'}} onPress={ ()=> {scrollToActivityViewerScreen(key)}} >{key}</Chip>
            )


        );

    }


    return(
        <></>
    )

}