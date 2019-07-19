import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import Emoji from 'react-native-emoji';


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
        photoData: this.props.navigation.getParam('data')
    }

    handlePredict = () => {
        Alert.alert(
            'Predictions',
            'Coming soon!!!',
            [{text: 'Ok'}]
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

