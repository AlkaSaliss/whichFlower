import React from 'react';
import {
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Image,
    View
} from 'react-native';

import { Input, Icon } from 'react-native-elements';


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

        if (this.state.username !== prevState.username || this.state.password !== prevState.password) {
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
                <Text style={[styles.introText, {flex: 1}]}>Flower Species Recognition</Text>
                <Text style={[styles.introText, {fontSize: 15, flex: 1}]}>This app predicts flower species from images using Deep Learning</Text>
                <Image
                    style={styles.image}
                    source={require('../docs/images/flower1.jpg')}
                    resizeMode='contain'
                />

                <Text style={[styles.introText, {color: 'red', fontSize: 15, flex: 1}]}>
                    Please login to start using the app!!!
                </Text>

                <Input
                    placeholder='username'
                    leftIcon={
                        <Icon name='user' type='feather' size={24} color='black' />
                    }
                    inputContainerStyle={styles.input}

                    value={this.state.username}
                    onChangeText={this.handleChange('username')}
                />

                <Input
                    placeholder='password'
                    leftIcon={
                        <Icon name='lock' size={24} color='black' />
                    }
                    inputContainerStyle={styles.input}
                    value={this.state.password}
                    onChangeText={this.handleChange('password')}
                    secureTextEntry={true}
                />
                
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
    },
    input: {
        borderWidth: 1,
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
        flex: 1,
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
        flex: 5,
        height: "100%",
        width: "100%",
        borderRadius: 10,
        alignSelf: 'center'

    },
    introText: {
        flex: 1,
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