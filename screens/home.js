import React from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, FlatList} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Emoji from 'react-native-emoji';
import { Icon } from 'react-native-elements';


export default class  HomeScreen extends React.Component {

    state = {
        supportedSpecies: ['Daisy', 'Dandelion', 'Rose', 'Sunflower', 'Tulip']
    }

    static navigationOptions = ({navigation}) => {
        return {
        headerTitle: 'Home',
        headerTintColor: 'teal',
        headerLeft: (
                        <Button
                            title="Go Back"
                            color="teal"
                            onPress={() => navigation.navigate('Login')}
                        />
        )
        
    }
}



    handleChoosePhoto = () => {
        const options = {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri){
                this.props.navigation.navigate(
                    "Predict",
                    {
                        data: response,
                        imagePath: response.path,
                        username: this.props.navigation.getParam('username')
                    }
                )
            }
        })
    }

    goToCamera = () => {
        this.props.navigation.navigate(
            "Camera",
            {username: this.props.navigation.getParam('username')}
        )
    }
    

    renderItem = ({item}) => {
        return (
            <View style={{flexDirection: "row"}}>
                <Text style={[styles.items, {paddingRight: 0}]}>{'\u2022' + ' '}</Text>
                <Text style={[styles.items, {paddingLeft: 0}]}>{item.key}</Text>
            </View>
        )
    }

    render(){

        return (<View behavior="padding" style={styles.container}>

                    <Text style={styles.text}>
                        Welcome {this.props.navigation.getParam('username')} <Emoji name="smiley" style={{fontSize: 25}} />!
                    </Text>

                    <Text style={[styles.text, {fontSize: 15}]}>
                        Upload or capture a flower image to get its specie.
                    </Text>
                    <Text style={[styles.text, {fontSize: 15, paddingBottom: 1}]}>
                        Currently supported flower species include : 
                    </Text>

                    <View style={{flex: 3, alignItems: 'center', alignSelf: 'center', paddingTop: 1}}> 
                        <FlatList 
                            numColumns={2}
                            data={[{key: 'Daisy'}, {key: 'Dandelion'}, {key: 'Rose'}, {key: 'Sunflower'}, {key: 'Tulip'}]}
                            renderItem={this.renderItem}
                             
                        />
                    </View>
                   

                    <View style={styles.image}>
                        <Image
                            source={require('../data/images/AI.jpg')}
                            style={{width: '100%', height: '100%', borderRadius: 15}}
                            resizeMode='stretch'
                        />
                    </View>
                    
                    <View style={styles.photoButton}>
                        {/* <View style={styles.buttonsContainer}>
                            <Button title='Upload' onPress={this.handleChoosePhoto} /> 
                        </View> */}
                        <View style={[styles.buttonsContainer, {paddingRight: 15}]}>
                            <Icon 
                                name='folder-upload'
                                type='material-community'
                                color='blue'
                                underlayColor='green'
                                raised
                                reverse 
                                onPress={this.handleChoosePhoto}
                            /> 
                        </View>
                        {/* <View style={styles.buttonsContainer} >
                            <Button title = 'Camera' onPress={this.goToCamera }/>
                        </View> */}
                        <View style={[styles.buttonsContainer, {paddingLeft: 15}]} >
                            <Icon 
                                name='camera'
                                type='material-community'
                                color='blue'
                                underlayColor='green'
                                raised
                                reverse
                                onPress = {this.goToCamera}
                            />
                        </View>
                    </View>
                    
                    
                </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor: '#b7b3ce',
        backgroundColor: '#F4FBFB',
    },
    photoButton: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    },
    buttonsContainer: {
        padding: 10
    },
    text: {
        flex: 1,
        color: 'teal',
        fontSize: 25,
        textAlign: 'center',
        alignSelf: 'center'
    },
    image: {
        flex: 7,
        // width: 300,
        // height: 300,
        borderRadius: 15,
    },
    items: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 5
    }
})
