import React from 'react';
import {
    Button,
    View,
    Dimensions,
    StyleSheet,
    Platform,
} from 'react-native';
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
        photo: null
    }

    takePicture() {
        const options = { quality: 0.5, base64: true,}

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
                >
                    {/* <Button
                        style={styles.capture}
                        title='Capture'
                        onPress={this.takePicture.bind(this)}
                    /> */}
                    <Icon 
                        name='camera'
                        type='material-community'
                        color='blue'
                        underlayColor='green'
                        raised
                        reverse
                        onPress={this.takePicture.bind(this)}
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
        flex: 9,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
        },
    capture: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        // padding: 10,
        // margin: 40
    }
})