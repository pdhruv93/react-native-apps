import React, { useRef } from 'react';
import { Animated, Easing} from 'react-native';

import {styles} from './StyleSheet';

export default function SpinAnimation(props) {

    console.log("Rotating Image Component Loaded!!");

    const rotateValueHolder = useRef(new Animated.Value(0)).current;


    const startImageRotateFunction = () => {
            rotateValueHolder.setValue(0);
            Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
            }).start(() => startImageRotateFunction());
    };


    React.useEffect(() => {
        startImageRotateFunction()
    }, [rotateValueHolder])

    const spin = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });


  return (
        <Animated.Image style={[{transform: [{rotate: spin}] },  {width: 70, height: 70}, styles.roundedImage ]} source={{uri: props.imageURL}} />
    );


}