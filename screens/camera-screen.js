import React from 'react';
import {
    Button,
    View,
    Dimensions,
    StyleSheet,
    Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';


export default class CameraScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Camera', 
            headerTintColor: 'teal',
            headerLeft: (
                            <Button
                                title="Go Back"
                                color="teal"
                                onPress={() => navigation.navigate('Home')}
                            />
            )
        }
    }

    state = {
        photo: null,
        zoom: 0
    }

    takePicture() {
        const options = { quality: 1.0, base64: false, skipProcessing: true, doNotSave: true}

        // to force image orientation to be on correct format
        device = Platform.OS
        if (device === 'ios') {
            options['forceUpOrientation'] = true
        } else {
            options['fixOrientation'] = true
        }

        this.camera
            .takePictureAsync(options)
            .then((data) => {
                this.props.navigation.navigate(
                    "Predict",
                    {
                        data: data,
                        username: this.props.navigation.getParam('username'),
                        imagePath: data.uri
                    }
                )
            })
            .catch(err => console.error(err))
    }

    changeZoom(value) {
        this.setState(() => {
        return {
            zoom: parseFloat(value)/100
        }
        })
    }

    render(){
        device = Platform.OS
        orientationMode = {}
        if (device === 'ios') {
            orientationMode['forceUpOrientation'] = true
        } else {
            orientationMode['fixOrientation'] = true
        }

        return ( 
            <View style={styles.container}>
                <RNCamera
                    ref={cam => this.camera = cam}
                    style={styles.camera}
                    fixOrientation={true}
                    forceUpOrientation={true}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    zoom={this.state.zoom}
                >
                    <Icon 
                        name='camera'
                        type='material-community'
                        color='blue'
                        underlayColor='green'
                        raised
                        reverse
                        onPress={this.takePicture.bind(this)}
                    />
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        thumbTintColor={"blue"}
                        maximumTrackTintColor={"white"}
                        minimumTrackTintColor={"blue"}
                        onValueChange={this.changeZoom.bind(this)}
                    />
                    
                </RNCamera>
            </View>
                
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
        },
    slider: {
        width: 200,
        height: 40,
    }
    // capture: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     borderRadius: 5,
    //     color: '#000',
    // }
})