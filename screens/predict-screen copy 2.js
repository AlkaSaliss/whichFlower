import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, Alert, Platform } from 'react-native';
import Emoji from 'react-native-emoji';
import * as tf from '@tensorflow/tfjs';
import * as tfnode from '@tensorflow/tfjs-node';
// const tfnode = require('@tensorflow/tfjs-node');
// const jimp = require('jimp');


// instantiate a new tflite object
const height_ = 224
const width_ = 224

export default class  PredictScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
       
        return {
            headerTitle: 'Predict Flower Species',
            headerTintColor: 'teal',
            headerLeft: (
                            <Button
                                title="Go Back"
                                color="teal"
                                onPress = {
                                    () => navigation.navigate('Home',
                                                {username: navigation.getParam('username')})
                                }
                            />
            )
        }
        
    }

    state = {
        photoData: this.props.navigation.getParam('data'),
        imagePath: this.props.navigation.getParam('imagePath'),
        model: null,
        imageHeight: height_,
        imageWidth: width_,
        predictions: null,
        labelsFile: 'models/labels.txt',
        modelFile: 'models/baseline_data_aug.tflite',
    }

    loadModel = async () => {
        tf.io.loadWeights
        const handler = tfnode.io.fileSystem('../data/tfjs-models/model.json')
        const model = await tf.loadLayersModel(handler)
        console.log("==============Model loaded")
        console.log(model)
        return model
    }

    loadImage = () => {
        console.log('===========LOading image')
        jimp.read(this.state.imagePath)
        .then( res => {
            return res.resize(this.state.imageHeight, this.state.imageWidth)
        }
        )
        .catch(err => {console.log(err)})
    }

    handlePredict = () => {
        Alert.alert(
            'Predictions',
            'Coming soon!!!',
            [{text: 'Ok'}]
        )

        my_image = this.loadImage()
        console.log(typeof(my_image))
        console.log(this.state.imagePath)
        console.log('Inference done!!!!!')
    }

    async componentDidMount() {
        console.log("=============trying ot load model")
        model = this.loadModel()
        .then(model => {
            this.setState({
                ...this.state,
                model: model
            })
        })
        // .catch(err => { console.log(err) })
        // try {
        //     const model = await tf.loadLayersModel('../data/tfjs-models/model.json')
        //     console.log('model loading OK===========')
        //     // this.setState({...this.state, model: model})
        //     console.log(model)
        // } catch (error) {
        //     console.log('========error loading model')
        //     console.log(error)
        // }
        
    }

    render(){

        return (<View behavior="padding" style={styles.container}>
                    
                    <Text style={styles.text}>
                        Welcome {this.props.navigation.getParam('username')} <Emoji name="smiley" style={{fontSize: 25}} />!
                    </Text>

                    <View style={styles.image}>
                        {this.state.photoData && (
                            <React.Fragment>
                                
                                <View style={{flex: 9, paddingBottom: 20, }}>
                                    <Image
                                        style={{width: '100%', height: '100%', borderRadius: 15}}
                                        resizeMode='stretch'
                                        source={{uri: this.state.photoData.uri}}
                                    />
                                </View>

                                <View style={[styles.buttonPredict]}>
                                    <Button title="Predict" onPress={this.handlePredict} />
                                </View>

                            </React.Fragment>
                        )}
                    </View>
                    
                </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#b7b3ce',
    },
    text: {
        flex: 1,
        color: 'teal',
        fontSize: 25,
        textAlign: 'center',
        alignSelf: 'center'
    },
    image: {
        flex: 9,
        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    buttonPredict: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        width: '40%',
        height: '60%',
    },
})

