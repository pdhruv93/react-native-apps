import React, {useState, useEffect } from 'react';
import {Dimensions} from 'react-native';

import {Chip} from 'react-native-paper';
import database from '@react-native-firebase/database';


export default ActivitiesList = (props)=> {

    console.log("!!!!Inside Activities Screen!!!!");

    const [activitiesFetchedFromDB, setActivitiesFetchedFromDB] = useState([]);
    const [areActivitiesFetchedFromDB, setAreActivitiesFetchedFromDB] = useState(true);
    const screenHeight= Dimensions.get('window').height;

    var activitiesRef= database().ref('/activities');


    scrollToActivityViewerScreen = () =>{
        props.scrollRef.current?.scrollTo({x: 0, y: screenHeight*1});
      };



      useEffect(() => {
    
        activitiesRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);

            setActivitiesFetchedFromDB(items);
            setAreActivitiesFetchedFromDB(true);
            })
    
      }, []);



    if(areActivitiesFetchedFromDB==true){

        return(

            activitiesFetchedFromDB.map((item, index) => {
                console.log(item);
                if(item!=null)
                {
                    return(
                        <Chip style={[ { backgroundColor: item.color }, {margin: 5} ]} textStyle={{fontWeight: 'bold'}} onPress={scrollToActivityViewerScreen}>{item.name}</Chip>
                    )
                }
            })


        );

    }


    return(
        <></>
    )

}