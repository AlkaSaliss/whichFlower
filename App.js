/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet } from 'react-native';

import LoginScreen from './screens/login-screen';
import HomeScreen from './screens/home';
import CameraScreen from './screens/camera-screen';
import PredictScreen from './screens/predict-screen';
import { createStackNavigator, createAppContainer} from 'react-navigation';


const AppNavigator = createStackNavigator(
  {
    Login:{
      screen: LoginScreen
    },
    Home: {
      screen: HomeScreen,
    },
    Camera: {
      screen: CameraScreen
    },
    Predict: {
      screen: PredictScreen
    }
    },
  {
    initialRouteName: "Login",
    headerLayoutPreset: 'center'
  }
)

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

export default createAppContainer(AppNavigator)
