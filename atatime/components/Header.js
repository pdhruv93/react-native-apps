import * as React from 'react';
import {StyleSheet} from 'react-native';
import { Appbar } from 'react-native-paper';

export default Header = (props) => {

  scrollToTop = () =>{
    props.scrollRef.current?.scrollTo({x: 0, y: 0});
  };

  return (
    <Appbar.Header style={styles.headerStyle}>
      <Appbar.Action icon="home" onPress={scrollToTop} color='#F05F40'/>
      <Appbar.Content title="@@time" color='#F05F40'/>
    </Appbar.Header>
  );
};



const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: 'white',
    }

  });