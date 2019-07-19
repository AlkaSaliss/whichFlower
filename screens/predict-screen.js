import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Platform } from 'react-native';
import Emoji from 'react-native-emoji';
import Tflite from "tflite-react-native";


// instantiate a new tflite object
let tflite = new Tflite()
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
                                onPress={() => navigation.navigate('Home')}
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


    handlePredict = () => {
        Alert.alert(
            'Predictions',
            'Coming soon!!!',
            [{text: 'Ok'}]
        )

        tflite.runModelOnImage({
                path: this.state.imagePath, // required
                imageMean: 0.0, // defaults to 127.5
                imageStd: 1.0, // defaults to 127.5
                numResults: 5, // defaults to 5
                threshold: 0.0 // defaults to 0.1
            },
            (err, res) => {
                if (err) { 
                    console.log('***************')
                    console.log(err)
                    console.log('***************')
                }
                    
                else {
                    console.log('========================')
                    console.log(res)
                    console.log('========================')
                }
            })
            console.log('Inference done!!!!!')
            console.log(this.state.photoData.uri)
            console.log(this.state.photoData.path)
    }

    componentDidMount() {
        tflite.loadModel({
            model: this.state.modelFile,
            labels: this.state.labelsFile
        },
            (err, res) => {
                if (err) { console.log(err) } 
                else { console.log(res) }
            }
        )
        
        // this.setState({
        //     ...this.state,
        //     imagePath: Platform.OS === 'ios' ? this.state.photoData.uri : 'file://' + this.state.photoData.path
        // })
        
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
    }
})

