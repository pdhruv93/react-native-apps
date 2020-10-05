import React,{useRef} from 'react';
import {Dimensions, StatusBar,StyleSheet,ScrollView} from 'react-native';
import MainScreen from './MainScreen';
import Header from './Header';

export default MainScreenWrapper = ({navigation}) => {

  const scrollRef=useRef();
  const screenHeight= Dimensions.get('window').height;

  return (
        <ScrollView style={styles.container} ref={scrollRef} stickyHeaderIndices={[1]}>
            <StatusBar barStyle="dark-content" />
            <Header scrollRef={scrollRef}></Header>
            <MainScreen scrollRef={scrollRef} screenHeight={screenHeight} navigation={navigation}></MainScreen>
        </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});