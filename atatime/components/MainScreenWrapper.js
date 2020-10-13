import React,{useRef, useState, useEffect} from 'react';
import {StatusBar,StyleSheet,ScrollView, Alert} from 'react-native';
import MainScreen from './MainScreen';
import Header from './Header';
import {AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';

export default MainScreenWrapper = ({navigation}) => {

  console.log("!!!!Inside MainScreenWrapper!!!!");

  const scrollRef=useRef();

  //State in Functional Component
  const [areProfileParametersFetched, setAreProfileParametersFetched] = useState(false);
  const [userId, setUserId] = useState(0);
  //const [userName, setUserName] = useState("star");
  const [profilePicURL, setProfilePicURL] = useState("");


  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      console.log(error);
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      //console.log(result.picture.data.url);
      setUserId(result.id);
      //setUserName(result.name);
      setProfilePicURL(result.picture.data.url);
      setAreProfileParametersFetched(true);
    }
  };


  useEffect(() => {
    
    AccessToken.getCurrentAccessToken()
    .then(data => {
      const processRequest = new GraphRequest(
        '/me?fields=name,picture.type(large)',
        null,
        get_Response_Info
      )
      // Start the graph request(sync call).
      new GraphRequestManager().addRequest(processRequest).start();
      })
      .catch(()=>{
      });


  }, []);

  

 if(areProfileParametersFetched==true){

    return(

      <ScrollView style={styles.container} ref={scrollRef} stickyHeaderIndices={[1]}>
            <StatusBar barStyle="dark-content" />
            <Header scrollRef={scrollRef} profilePicURL={profilePicURL}></Header>
            <MainScreen scrollRef={scrollRef} navigation={navigation}></MainScreen>
        </ScrollView>
    );

  }

    return(
      <></>
    )





  
};





const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});