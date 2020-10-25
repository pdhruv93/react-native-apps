import React, {useState, useEffect, useContext} from 'react';
import {Text, Dimensions, ScrollView, View, Linking} from 'react-native';
import { Avatar, Button} from 'react-native-paper';

import database from '@react-native-firebase/database';
import axios from 'axios';

import { UtilityContext } from './MainScreenWrapper';
import {ActivityContext} from './MainScreen';
import {styles} from './StyleSheet';


export default ActivityViewer = (props)=> {

    console.log("!!!!Inside ActivityViewer Screen!!!!");

    const [usersPerformingSameActivity, setUsersPerformingSameActivity] = useState([]);

    let {userDetails}=useContext(UtilityContext);
    const {selectedActivity}=useContext(ActivityContext);
    let currentLocation="";




    const sendNotificationToUsers = async () =>{
        console.log("Sending Notifications to all users who are performing same activity...");
        let deviceIds=[];
        Object.keys(usersPerformingSameActivity).map(key => {
            if(usersPerformingSameActivity[key]!=userDetails.userId)
                deviceIds.push(usersPerformingSameActivity[key].deviceId);
        })

        if(deviceIds.length>0)
        {
            axios.post('https://fcm.googleapis.com/fcm/send',{
                "registration_ids": deviceIds,
                "notification": {
                    "title": "@@time",
                    "body": "There is another user with activity "+selectedActivity+". Tap to check!!",
                    "icon": "ic_notification"
                }
            },
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization' : 'key=AAAA4bWJScI:APA91bEXP3eOGFuC8XHCTql__GJfxZbC-ashdUoMIrKlgg0ahu9jt-ILfkyLnjDioCBFwhe1jZQrneHj0rhSzdyW08ZAhcNokae2G5mEDh5bsCqm5TzfMTZik2w6cDYpHXzDLQmKO65g'
                }
            })
            .then(res => {
                console.log("Sent Notifications to IDs:"+JSON.stringify(deviceIds));
                //console.log(res);
                //console.log(res.data);
            })
            .catch((error) => {
                console.log("Some error while sending notifications to devices");
                console.error(error)
            })
        }
        else
        {
            console.log("No DeviceIds to send notifications!!");
        }
    }





    const fetchAllUsersWithSameActivity = async () =>{
        console.log("Fetching all users who are performing same activity...");
        database().ref('/userActivities/'+selectedActivity)
        .once('value', (snapshot) => {
            let data = snapshot.val();
            console.log("Successfully Fecthed all users who are performing same activity !!");
            console.log("Users who are performing same activity:"+JSON.stringify(data));
            setUsersPerformingSameActivity(data);
            sendNotificationToUsers();
        });
    }



    const createNewEntryInUserActivityTable = async () =>{

        console.log("Adding new entry...");
        database().ref("/userActivities/"+selectedActivity+"/"+userDetails.userId)
        .set({
            userName: userDetails.userName, 
            profilePicURL: userDetails.profilePicURL, 
            deviceId: userDetails.deviceId, 
            screenName: userDetails.screenName,
            location : currentLocation,
            startTime: new Date()
          }
        )
        .then(() =>{
            console.log("Successfully added new entry for user in Firebase DB!!");
            fetchAllUsersWithSameActivity();
        })

    }




    const getUserCurrentLocation = async () =>{
        
        console.log("Getting current Location for User!!");

        console.log("Getting current Location for User From IP Address!!");
        fetch('http://ip-api.com/json')
        .then((response) => response.json())
        .then((response) => {
            currentLocation=response.city+", "+response.country;
            console.log("USer's Location"+currentLocation);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(()=>{
            createNewEntryInUserActivityTable();
        });

    }




    useEffect(() => {

        console.log("User's current selected activity:"+selectedActivity);

        if(selectedActivity!="")
        {
            console.log("Deleting old entry of this activity for same user in Firebase!!");
            database().ref("/userActivities/"+selectedActivity+"/"+userDetails.userId).remove()
            .then(()=>{
                console.log("Successfully deleted entry for User...");
                getUserCurrentLocation();
            })
        }
    },[selectedActivity]);





    if(usersPerformingSameActivity!=null && Object.keys(usersPerformingSameActivity).length>0 ){
        return(
            <ScrollView style={styles.container} horizontal= {true} decelerationRate={0} snapToInterval={Dimensions.get('window').width - 60} snapToAlignment={"center"} contentInset={{top: 0,left: 30,bottom: 0,right: 30,}} >
                {
                    Object.keys(usersPerformingSameActivity).map(key => 
                        <View key={key} style={styles.card}>
                            <Text>{"\n"}</Text>
                            <Avatar.Image size={70} source={{ uri:usersPerformingSameActivity[key].profilePicURL }}/>
                            <Text>{"\n"}</Text>
                            <Text style={[styles.cardText, styles.boldText]} >
                                {key==userDetails.userId ? "It's you" : usersPerformingSameActivity[key].userName}
                            </Text>
                            <Text style={styles.cardText}>{usersPerformingSameActivity[key].location}</Text>
                            <Text>{"\n"}</Text>
                            {
                                key==userDetails.userId || usersPerformingSameActivity[key].screenName==""
                                ? 
                                    <Text>""</Text>
                                : 
                                    <Button mode="contained" onPress={() => Linking.openURL('https://m.me/'+usersPerformingSameActivity[key].screenName)} >
                                        Chat on Messenger
                                    </Button>
                            }
                        </View>
                    )
                }
            </ScrollView>
        );
    }




    return(
        <>
            <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
                "You need imagination in order to imagine a future that doesn't exist". Select an activity from top 
            </Text>
        </>
    )



}

    