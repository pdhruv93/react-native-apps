import React,{useRef, useState, useEffect} from 'react';
import {StatusBar,StyleSheet,ScrollView, Alert} from 'react-native';
import MainScreen from './MainScreen';
import Header from './Header';
import {AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';

export default MainScreenWrapper = ({navigation}) => {

  console.log("!!!!Inside MainScreenWrapper!!!!");

  const scrollRef=useRef();

  const [areUserDetailsFetched, setAreUserDetailsFetched] = useState(false);
  const [userDetails, setuserDetails] = useState([]);


  get_Response_Info = (error, result) => {
    if(!error)
    {
      setuserDetails(result);
      setAreUserDetailsFetched(true);
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

  

 if(areUserDetailsFetched==true){

    return(

      <ScrollView style={styles.container} ref={scrollRef} stickyHeaderIndices={[1]}>
            <StatusBar barStyle="dark-content" />
            <Header scrollRef={scrollRef} userDetails={userDetails}></Header>
            <MainScreen scrollRef={scrollRef} navigation={navigation} userDetails={userDetails}></MainScreen>
        </ScrollView>
    );

  }

    return(
      <></>
    )





  
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});