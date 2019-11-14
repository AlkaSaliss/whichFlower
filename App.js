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


// List of screens contained in the app
const AppNavigator = createStackNavigator(
  {
    Login:{
      screen: LoginScreen // for login with password and username
    },
    Home: {
      screen: HomeScreen // Main screen presenting the options in the app
    },
    Camera: {
      screen: CameraScreen // Screen for taking a picture via camera
    },
    Predict: {
      screen: PredictScreen // screen displaying the prediction made by the app
    }
    },
  {
    initialRouteName: "Login",
    headerLayoutPreset: 'center'
  }
)

export default createAppContainer(AppNavigator)
