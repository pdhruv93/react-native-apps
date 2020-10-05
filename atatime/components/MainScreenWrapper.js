import React,{useRef, useState} from 'react';
import {Dimensions, StatusBar,StyleSheet,ScrollView} from 'react-native';
import MainScreen from './MainScreen';
import Header from './Header';
import {AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';

export default MainScreenWrapper = ({navigation}) => {

  const scrollRef=useRef();
  const screenHeight= Dimensions.get('window').height;


  //State in Functional Component
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("star");
  const [profilePicURL, setProfilePicURL] = useState("");

  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      //console.log(result.picture.data.url);
      setUserId(result.id);
      setUserName(result.name);
      setProfilePicURL(result.picture.data.url);
    }
  };


  AccessToken.getCurrentAccessToken().then(data => {
    const processRequest = new GraphRequest(
      '/me?fields=name,picture.type(large)',
      null,
      get_Response_Info
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(processRequest).start();
  });




  return (
        <ScrollView style={styles.container} ref={scrollRef} stickyHeaderIndices={[1]}>
            <StatusBar barStyle="dark-content" />
            <Header scrollRef={scrollRef} screenHeight={screenHeight} profilePicURL={profilePicURL}></Header>
            <MainScreen scrollRef={scrollRef} screenHeight={screenHeight} navigation={navigation}></MainScreen>
        </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});