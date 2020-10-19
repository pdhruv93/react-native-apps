import React, {useState} from 'react';
import {Text, Animated} from 'react-native';
import database from '@react-native-firebase/database';
import axios from 'axios';





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

            if(userActitvities!=null)
            {

                Object.keys(userActitvities).map((key) => 
                {
                    if(userActitvities[key].userId!=props.userDetails.id && new Date(userActitvities[key].startTime) >= activeTime)
                    {
                        //console.log(userActitvities[key]);
                        userIdsWithSameActivity.push(userActitvities[key].userId)
                    }
                }
            )
            }

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

            if(data!=null)
            {
                Object.keys(data).map(key =>{

                    if(data[key].sendNotifications==true && userIdsWithSameActivity.includes(key) && key!=props.userDetails.id)
                    {
                        deviceIDsForAllUsers.push(data[key].deviceId);
                    }
    
                });
            }

        });
      
        return deviceIDsForAllUsers;

    };





    const sendNotificationToDevices = async (deviceIDsForAllUsers)=>{

        console.log("Sending Notification to selected Device Ids!!");

        axios.post('https://fcm.googleapis.com/fcm/send',
            {
                "registration_ids": deviceIDsForAllUsers,
                "notification": {
                    "title": "@@time",
                    "body": "There is a user with same action as yours. Tap to check!!",
                    "icon": "ic_notification"
                }
            },
            {
                headers: 
                {
                  'Content-Type': 'application/json',
                  'Authorization' : 'key=AAAA4bWJScI:APA91bEXP3eOGFuC8XHCTql__GJfxZbC-ashdUoMIrKlgg0ahu9jt-ILfkyLnjDioCBFwhe1jZQrneHj0rhSzdyW08ZAhcNokae2G5mEDh5bsCqm5TzfMTZik2w6cDYpHXzDLQmKO65g'
                }
            }
        )
        .then(res => {
            console.log("Sent Notifications to IDs");
            console.log(res);
            console.log(res.data);
        })
        .catch((error) => {
            console.log("Some error while sending notifications to devices");
            console.error(error)
          })

    };





    const loadFinalScreen = async () =>{

        if(props.selectedActivity!="0")
        {
            let userIdsWithSameActivity= await fetchUsersWithSameActivity();
            //console.log("userIdsWithSameActivity:::"+userIdsWithSameActivity);

            if(userIdsWithSameActivity!=null && userIdsWithSameActivity.length>0)
            {
                let deviceIDsForAllUsers= await fetchDeviceIdsForAllUsers(userIdsWithSameActivity);
                deviceIDsForAllUsers.push("duLgdV8xSHSMpDKEzZ_4ms:APA91bF8WwZfBeRkY0Fz_co03wXd0gROEV6TuKaUrmvAApH72Xmt0bHjbWm2FlWjN-TQKs2TQFt7WzC_o8r89zDY8kR82rVddiqC4FqrKW40UM0OZaQiB4h06PV6lMeANMgrplxZr6gR");
                //console.log("deviceIDsForAllUsers:::"+deviceIDsForAllUsers);
                await sendNotificationToDevices(deviceIDsForAllUsers);
            }
           
            
        }
    }


   
    loadFinalScreen();



    return(
        <>
            <Text style={{fontSize: 16, color:"rgba(255, 255, 255, 0.7)", textAlign: "center", margin: 20}}>
                "You need imagination in order to imagine a future that doesn't exist". In short, select an activity from top
             </Text>
        </>
    )


}