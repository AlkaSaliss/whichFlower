import React from 'react';
import {
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Image,
    View
} from 'react-native';

import { Input, Button, Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';


export default class LoginScreen extends React.Component {

    static navigationOptions = {
        headerTitle: 'Login',
        headerTintColor: 'teal',
        headerTitleStyle: {alignSelf:  'center'}
    }
    state = {
        username: "",
        password: "",
        isFormValid: false
    };

    componentDidUpdate(prevProps, prevState) {

        if (this.state.username !== prevState.username || this.state.password != prevState.password) {
            this.validateForm();
        }
    }

    componentDidMount(prevProps, prevState) {

        const {navigation} = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({
                username: "",
                password: "",
                isFormValid: false
            })
        })
    }

    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
        this.focusListener.remove();
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    };

    handleSubmit = () => {
        if (this.state.isFormValid === true) {
            // console.log('form ok!!')
            this.props.navigation.navigate('Home',
                { username: this.state.username })
        }
    }

    validateForm = () => {
        if (this.state.username.length >= 3 && this.state.password.length >= 8) {
            this.setState({ isFormValid: true })
        } else {
            this.setState({ isFormValid: false })
        }
    }

    render() {

        return (
            <KeyboardAvoidingView
                style={styles.container}
                username={this.state.username}>
                <Text style={styles.introText}>Flower Species Recognition</Text>
                <Text style={[styles.introText, {fontSize: 15}]}>This app predicts flower species from images using Deep Learning</Text>
                <Image
                    style={styles.image}
                    source={require('../data/images/flower1.jpg')}
                    resizeMode='contain'
                />

                <Text style={[styles.introText, {color: 'red', fontSize: 15}]}>Please login to start using the app!!!</Text>

                <Input
                    placeholder='username'
                    // placeholderTextColor='black'
                    leftIcon={
                        <Icon name='user' type='feather' size={24} color='black' />
                    }
                    // inputStyle={styles.text}
                    inputContainerStyle={styles.input}

                    value={this.state.username}
                    onChangeText={this.handleChange('username')}
                />

                <Input
                    placeholder='password'
                    leftIcon={
                        <Icon name='lock' size={24} color='black' />
                    }
                    // inputStyle={styles.input}
                    inputContainerStyle={styles.input}
                    value={this.state.password}
                    onChangeText={this.handleChange('password')}
                    secureTextEntry={true}
                />
                {/* <Button
                    buttonStyle={[styles.button, { backgroundColor: changingColor[this.state.isFormValid] }]}
                    onPress={this.handleSubmit}
                    disabled={!this.state.isFormValid}
                    icon={
                        <Icon
                            name="sign-in"
                            size={30}
                            color="black"
                        />
                    }
                /> */}
                
                <View style={styles.button}>
                    <Icon 
                        name='login'
                        type='antdesign'
                        color='blue'
                        underlayColor='green'
                        raised
                        reverse
                        onPress={this.handleSubmit}
                        disabled={!this.state.isFormValid}
                    />
                </View>

            </KeyboardAvoidingView>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F4FBFB',
        // backgroundColor: '#b7b3ce'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        minWidth: 100,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor: '#442ccc',
        height: 30
    },
    button: {
        // backgroundColor: '#b7b3ce',
        backgroundColor: '#F4FBFB',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 25
    },
    image: {
        height: 300,
        width: 400,
        borderRadius: 10,
        alignSelf: 'center'

    },
    introText: {
        color: 'teal',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20
    }
})

const changingColor = {
    false: "#F8FAFB",
    true: "teal"
}