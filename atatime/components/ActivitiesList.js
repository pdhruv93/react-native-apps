import React, {useState, useEffect, useContext } from 'react';
import {Dimensions} from 'react-native';
import {Chip} from 'react-native-paper';
import database from '@react-native-firebase/database';
import {ActivityContext} from './MainScreen';
import Geolocation from 'react-native-geolocation-service';


export default ActivitiesList = (props)=> {

    console.log("!!!!Inside Activities Screen!!!!");

    const [activitiesFetchedFromDB, setActivitiesFetchedFromDB] = useState([]);
    const [areActivitiesFetchedFromDB, setAreActivitiesFetchedFromDB] = useState(false);

    const screenHeight= Dimensions.get('window').height;
    var activitiesRef= database().ref('/activities');

    const {setActivity}=useContext(ActivityContext);


    let currentLocation={latitude : "0", longitude: "0"};

    const saveActivityToDB = (activityKey) =>{

        console.log("Saving Activity to UserActivities Table");
        database().ref('/userActivities').push({
            userId: props.userDetails.id,
            activityId: activityKey,
            location : currentLocation,
            startTime : new Date()
          })
          .then(()=>{
            setActivity(activityKey);
            props.scrollRef.current?.scrollTo({x: 0, y: screenHeight*1});
        })
        .catch(err =>{
            console.log(err);
            console.warn("Some error occurred! It happens! This is not the end of world, you cvan try again!");
        })

    }




    const getUserCurrentLocation = (activityKey) =>{

        console.log("Getting current Location for User!!");
        Geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
              currentLocation.latitude=position.coords.latitude;
              currentLocation.longitude=position.coords.longitude;
                saveActivityToDB(activityKey);
            },
            (error) => {
              console.log(error.code, error.message);
                saveActivityToDB(activityKey);
            },
            { enableHighAccuracy: false, timeout: 8000 }
        );

    }
   


    performActivityOnClickOperation = (activityKey) =>{
        getUserCurrentLocation(activityKey);
      };



    useEffect(() => {

    console.log("Getting acitivity tags list from Firebase!!");
    activitiesRef.on('value', (snapshot) => {

        let data = snapshot.val();

        setActivitiesFetchedFromDB(data);
        setAreActivitiesFetchedFromDB(true);
        })

    }, []);



    if(areActivitiesFetchedFromDB==true){

        return(
            Object.keys(activitiesFetchedFromDB).map(key => 
                <Chip key={key} style={[ { backgroundColor: activitiesFetchedFromDB[key].color }, {margin: 5} ]} textStyle={{fontWeight: 'bold'}} onPress={ ()=> {performActivityOnClickOperation(key)}} >{key}</Chip>
            )
        );

    }


    return(
        <></>
    )

}