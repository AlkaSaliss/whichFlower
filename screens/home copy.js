import React from 'react';
import {Platform, StyleSheet, Text, View, Image, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';


export default class  HomeScreen extends React.Component {

    static navigationOptions = {
        headerTitle: 'Home',
        headerTintColor: 'teal',
        
    }

    state = {
        photo: null
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri){
                this.setState({photo: response})
                console.log('*****handleChoosePhoto called****')
                console.log("photo: ", response)
            }
        })
    }

    handleUploadPhoto = () => {
        
        // fetch('http://localhost:3000/api/upload', {
        fetch('http://10.0.2.2:3000/api/upload', {
            method: 'POST',
            body: createFormData(this.state.photo, {userID: 'alka'})
        })
        .then((response) => {
            response.json()
        })
        .then(response => {
            console.log("Upload success!", response)
            alert("Upload success!")
            this.setState({photo: null})
        })
        .catch(error => {
            console.log("Upload error: ", error)
            alert("Upload failed!")
        })
    }


    render(){
        const {photo} = this.state

        return (<View behavior="padding" style={styles.container}>
                    <Text style={styles.text}>
                        Hello {this.props.navigation.getParam('username')}
                    </Text>
                    {photo && (
                        <React.Fragment>
                            <Image
                                source={{uri: photo.uri}}
                                style={styles.image}
                            />
                            <Button title="Upload" onPress={this.handleUploadPhoto} />
                        </React.Fragment>
                    )}
                    <Button
                        title='Select photo'
                        onPress={this.handleChoosePhoto}
                    />
                </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    text: {
        color: 'black',
        fontSize: 25
    },
    image: {
        width: 300,
        height: 300
    }
})


const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
        name: photo.filename,
        type: photo.type,
        uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    })
    
    Object.keys(body).forEach(key => {
        data.append(key, body[key])
    })

    return data
}