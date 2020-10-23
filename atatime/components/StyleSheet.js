import {Dimensions,StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    screen: {
      flexDirection: 'column', 
      height: Dimensions.get('window').height,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    redBackground: {
      backgroundColor: '#F05F40',
    },
  
    blueBackground: {
      backgroundColor: '#007bff',
    },

    whiteBackground: {
      backgroundColor: 'white',
    },
  
    text:{
        textAlign: "center", 
        margin: 20
    },

    whiteText:{
      color: "white"
    },

    boldText:{
        fontWeight: "bold"
    },

    scrollButton : {
      textTransform: 'uppercase',
      borderRadius: 300,
      padding: 15,
      minWidth: "50%",
      marginTop: 30
    },
  
  });