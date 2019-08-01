import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, Alert } from 'react-native';
import Emoji from 'react-native-emoji';
import Tflite from "tflite-react-native";
import BarChartComponent from './barChart';


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
        hasPredicted: false,
        labelsFile: 'models/labels.txt',
        modelFile: 'models/baseline_data_aug.tflite',
        imageFlex: 9

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
                imageStd: 255.0, // defaults to 127.5
                numResults: 5, // defaults to 5
                threshold: 0 // defaults to 0.1
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
                    res.sort((x, y) => (x.label > y.label) ? 1 : ((y.label > x.label) ? -1 : 0))
                    resFinal = []
                    for (let i=0; i<res.length; i++){
                        resFinal.push(
                            {
                                ...res[i], key: res[i].label,
                                confidence: Number(parseFloat(res[i].confidence*100).toFixed(2))
                            }
                        )
                        console.log(typeof(resFinal[i].confidence))
                    }
                     
                    this.setState({
                        ...this.state,
                        predictions: resFinal, 
                        imageFlex: 5,
                        hasPredicted: true
                    })
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


    renderItem = ({item}) => {
        return (
            <View style={{flexDirection: "row", }}>
                <Text style={[styles.items, {paddingRight: 0}]}>{'\u2022' + ' '}</Text>
                {/* <Text style={[styles.items, {paddingLeft: 0}]}>{item.label + ' ' + parseFloat(item.confidence*100).toFixed(4)}</Text> */}
                <View style={{flexDirection: 'row', paddingLeft: 0}}>
                    <Text style={[styles.items]}>{item.label + ' : '}</Text>
                    <Text style={[styles.items, {color: 'red'}]}>{parseFloat(item.confidence*100).toFixed(4)}</Text>
                </View>
            </View>
        )
    }


    render(){

        return (<View behavior="padding" style={styles.container}>
                    
                    <Text style={styles.text}>
                        Welcome {this.props.navigation.getParam('username')} <Emoji name="smiley" style={{fontSize: 25}} />!
                    </Text>

                    <View style={styles.image}>
                        {this.state.photoData && (
                            <React.Fragment>
                                
                                <View style={{flex: this.state.imageFlex, paddingBottom: 20, }}>
                                    <Image
                                        style={{width: '100%', height: '100%', borderRadius: 15}}
                                        resizeMode='stretch'
                                        source={{uri: this.state.photoData.uri}}
                                    />
                                </View>

                                {this.state.predictions && (

                                    <BarChartComponent 
                                        data={this.state.predictions}
                                        // data={[ 
                                        //     {label: 'Daisy', confidence: 10},
                                        //     {label: 'Dandelion', confidence: 5},
                                        //     {label: 'Rose', confidence: 25},
                                        //     {label: 'Sunflower', confidence: 15},
                                        //     {label: 'Tulip', confidence: 20}
                                        // ]} 
                                        viewStyle={styles.predictions}
                                    />
                                )
                                }

                                    {/* <View style={styles.predictions}>  */}
                                        {/* <FlatList 
                                            numColumns={2}
                                            data={this.state.predictions}
                                            renderItem={this.renderItem}
                                            
                                        /> */}
                                        
                                        
                                    {/* </View> */}
                                
                                { !this.state.hasPredicted ?
                                    <View style={[styles.buttonPredict]}>
                                        <Button
                                            title="Predict"
                                            onPress={this.handlePredict}
                                            // onPress={() => {this.props.navigation.navigate("BarChart")}}
                                        />
                                    </View>
                                        :
                                    <View style={[styles.buttonPredict]}>
                                        <Button
                                            title="Pick another image"
                                            onPress={() => {this.props.navigation.navigate(
                                                "Home",
                                                {username: this.props.navigation.getParam('username')}
                                            )}}
                                        />
                                    </View>

                                }

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
        backgroundColor: '#F4FBFB',
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
    items: {
        color: 'green',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 5
    },
    predictions: {
        width: '100%',
        height: '100%',
        // borderColor: 'red',
        // borderWidth: 2,
        // borderRadius: 5,
        flex: 5,
        paddingBottom: 4,
        // alignItems: 'center',
        // alignSelf: 'center',
        // paddingTop: 1
    }
})

