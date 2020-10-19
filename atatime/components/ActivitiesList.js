import React, {useState, useEffect, useContext } from 'react';
import {Dimensions, Platform, PermissionsAndroid} from 'react-native';
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


    const saveActivityToDB = async (activityKey, currentLocation) =>{
        console.log("Saving Activity "+activityKey+" to UserActivities Table");
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
            console.warn("Some error occurred while saving User's activity to DB");
        })

    }


     const fetchIdsForSameActivityForUser = async (activityKey) =>{
        console.log("Checking if there is already an entry for "+activityKey+" for current User.");

        const idsForSameActivityForUser=[];

        await database().ref("/userActivities")
        .orderByChild('userId').equalTo(props.userDetails.id)
        .once("value", function(snapshot) {
            let data = snapshot.val();

            if(data!=null)
            {
                Object.keys(data).map(key => 
                    {
                        if(data[key].activityId == activityKey)
                            idsForSameActivityForUser.push(key);
                    }
                )  
            }

        });

        return idsForSameActivityForUser;
    }



     const deleteSameActivityForUser = async (idsForSameActivityForUser) =>{
        console.log("Deleting following entries from User activity table:"+idsForSameActivityForUser);

        idsForSameActivityForUser.forEach(async (value) => {
            //console.log("Deleting"+value);
            await database().ref("/userActivities/"+value).remove();
        })
    }


    const getUserCurrentLocation = async () =>{

        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            );
          }

        console.log("Getting current Location for User!!");

        let currentLocation={latitude : "0", longitude: "0"};

        await new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition( 
                
                (position) =>{
                    currentLocation.latitude=position.coords.latitude;
                    currentLocation.longitude=position.coords.longitude;
                    resolve();
                }, 
                
                
                
                (error) =>{                    
                    console.log("Some error occurred while fetching User's current Location");
                    console.log(error.code, error.message);
                    resolve();
                }, 
                
                
                {enableHighAccuracy: false, timeout: 8000} );

        });

        return currentLocation;

    }
   


    performActivityOnClickOperation = async (activityKey) =>{

        const idsForSameActivityForUser= await fetchIdsForSameActivityForUser(activityKey);
        
        if(idsForSameActivityForUser!=null && idsForSameActivityForUser.length>0)
            await deleteSameActivityForUser(idsForSameActivityForUser);

        let currentLocation=await getUserCurrentLocation(activityKey);

        await saveActivityToDB(activityKey, currentLocation);


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