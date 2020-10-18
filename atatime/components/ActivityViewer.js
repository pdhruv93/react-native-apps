import React, {useState} from 'react';
import {Text} from 'react-native';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';




export default ActivityViewer = (props)=> {

    console.log("!!!!Inside ActivityViewer Screen!!!!");


    const fetchUsersWithSameActivity = async ()=>{

        console.log("Fetching all Users who have Same activity!!");

        let userIdsWithSameActivity=[];
        let activeTime = new Date().setHours(new Date().getHours() - 1);

        await database().ref("/userActivities")
        .orderByChild('activityId').equalTo(props.selectedActivity)
        .once("value", function(snapshot) {
            
            //console.log("Snapshot Value:"+snapshot.val());
            var userActitvities=snapshot.val();

            Object.keys(userActitvities).map((key) => 
                {
                    if(new Date(userActitvities[key].startTime) >= activeTime)
                    {
                        //console.log(userActitvities[key]);
                        userIdsWithSameActivity.push(userActitvities[key].userId)
                    }
                }
            )

        });
        
        //console.log("Returning Value");
        return userIdsWithSameActivity;

    }




    const fetchDeviceIdsForAllUsers = async (userIdsWithSameActivity)=>{

        console.log("Fetching Device Ids for others Users who have same activity!!");

        let deviceIDsForAllUsers=[];

        await database().ref("/user")
        .once("value", (snapshot) => {

            let data=snapshot.val();
            
            Object.keys(data).map(key =>{

                if(data[key].sendNotifications==true && userIdsWithSameActivity.includes(key) )
                {
                    deviceIDsForAllUsers.push(data[key].deviceId);
                }

            });

        });
      
        return deviceIDsForAllUsers;

    };





    const sendNotificationToDevices = async (deviceIDsForAllUsers)=>{

        console.log("Sending Notification to selected Device Ids!!");

        // Send a message to devices with the registered tokens
        await messaging().sendMulticast({
            deviceIDsForAllUsers,
            data: { hello: 'world!' },
        });

    };





    const loadFinalScreen = async () =>{

        if(props.selectedActivity!="0")
        {
            let userIdsWithSameActivity= await fetchUsersWithSameActivity();
            let deviceIDsForAllUsers= await fetchDeviceIdsForAllUsers(userIdsWithSameActivity);
            console.log(":::"+deviceIDsForAllUsers);
            await sendNotificationToDevices(deviceIDsForAllUsers);
            
        }
    }


   
    loadFinalScreen();



    return(
        <>
            <Text style={{fontSize: 16, color:"rgba(255, 255, 255, 0.7)"}}>
                "You need imagination in order to {"\n"}imagine a future that doesn't exist".{"\n"} In short, select an activity from top
             </Text>
        </>
    )


}