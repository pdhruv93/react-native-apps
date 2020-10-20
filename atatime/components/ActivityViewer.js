import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, ScrollView, Dimensions, View, Linking} from 'react-native';
import database from '@react-native-firebase/database';
import axios from 'axios';
import { Avatar, Button} from 'react-native-paper';


const { width } = Dimensions.get('window');

export default ActivityViewer = (props)=> {

    console.log("!!!!Inside ActivityViewer Screen!!!!");

    const [isFinalScreenPrepared, setIsFinalScreenPrepared] = useState(false);


    const fetchUsersWithSameActivity = async ()=>{

        console.log("Fetching all Users who have performed same activity!!"+props.selectedActivity);

        let userIdsWithSameActivity=[];
        let locationForThoseActivities=[];
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
                        locationForThoseActivities.push(userActitvities[key].location)
                    }
                }
            )
            }

        });
        
        //console.log("Returning Value");
        return [userIdsWithSameActivity, locationForThoseActivities];

    }




    const fetchDeviceIdsForAllUsers = async (userIdsWithSameActivity)=>{

        console.log("Fetching Device Ids for other Users who have same activity!!");

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





    const sendNotificationToDevices = (deviceIDsForAllUsers)=>{

        console.log("Sending Notification to selected Device Ids!!");

        axios.post('https://fcm.googleapis.com/fcm/send',
            {
                "registration_ids": deviceIDsForAllUsers,
                "notification": {
                    "title": "@@time",
                    "body": "There is another user with activity "+props.selectedActivity+". Tap to check!!",
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




    const loadFinalScreen = async ()=>{

        if(props.selectedActivity!="0")
        {
        
            let [userIdsWithSameActivity, locationForThoseActivities]= await fetchUsersWithSameActivity();

            console.log("UserIDs for user who are performing same activity:"+userIdsWithSameActivity);

            if(userIdsWithSameActivity!=null && userIdsWithSameActivity.length>0)
            {
                let deviceIDsForAllUsers= await fetchDeviceIdsForAllUsers(userIdsWithSameActivity);
                console.log("Device Ids for Users who are performing same activity:"+deviceIDsForAllUsers);
                sendNotificationToDevices(deviceIDsForAllUsers);
            }


            let finalDetails=[]

            userIdsWithSameActivity.forEach((value, index) => {
            
                let name="";
                let profilePicURL="";
                let showLocation=true;
                let allowChat=true;
                let locationName="Helsinki";

                database().ref("/user/"+value)
                .once('value', (snapshot) => {
                    let data = snapshot.val();
                    name=data.name;
                    profilePicURL=data.profilePicURL;
                    showLocation=data.showLocation;
                    allowChat=data.allowChat;
                })


            })
        }


        setIsFinalScreenPrepared(true)
    }




    loadFinalScreen(); 

    

    if(isFinalScreenPrepared==true)
    {

        return(
            <>
                <Text style={{fontSize: 18, textAlign: 'center', color:'#F05F40', fontWeight:'bold' }}>Live</Text>

                <ScrollView style={styles.container} horizontal= {true} decelerationRate={0} snapToInterval={width - 60} snapToAlignment={"center"} contentInset={{top: 0,left: 30,bottom: 0,right: 30,}}>
                    <View style={styles.card}>
                        <Avatar.Image size={70} source={{uri: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'}}/>
                        <Text>{"\n"}</Text>
                        <Text style={[styles.cardText,{ fontWeight: 'bold'}]} >Dhruv Pandey</Text>
                        <Text style={styles.cardText}>Helsinki</Text>
                        <Text>{"\n"}</Text>
                        <Button mode="contained" onPress={() => Linking.openURL('https://m.me/greenpandey')} >
                            Chat on Messenger
                        </Button>
                    </View>
                </ScrollView>

            </>
        )

    }
        


    


    return(
        <>
            <Text style={{fontSize: 16, color:"rgba(255, 255, 255, 0.7)", textAlign: "center", margin: 20}}>
                "You need imagination in order to imagine a future that doesn't exist". In short, select an activity from top
             </Text>
        </>
    )


}






const styles = StyleSheet.create({
    container: {},
    card: {
      marginTop: 100,
      backgroundColor: '#F05F40',
      width: width - 80,
      margin: 10,
      height: 300,
      borderRadius: 10,
      opacity: 0.9,
      shadowColor: '#000',
      shadowOffset: { width: 10, height: 10 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 2,

      display: 'flex',
      alignItems: 'center',
    padding: 15
    },

    cardText :{
        fontSize: 18, 
        color:"white"
    }
  });
  