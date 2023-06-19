/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
    Button,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Pressable,
    KeyboardAvoidingView
} from 'react-native';

import axios from "axios"

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { API_URL } from "@env"

//import storage from '@react-native-firebase/storage';
//import * as ImagePicker from 'react-native-image-picker';
import AddNewItemForm from '../components/AddNewItemForm';
import { configDotenv } from 'dotenv';

//const reference = storage();


/* const Item = ({ item }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.imageName}>{item.imageName}</Text>
            <Image style={styles.image} source={{ uri: item.imageUrl }} />
        </View>
    );
}; */

const Separator = () => <View style={styles.separator} />;

const AddNewItemScreen = ({ navigation }) => {

    //const [images, setImages] = useState([]);
    const isDarkMode = useColorScheme() === 'dark';

    const handleFormSubmit = (form) => {

        console.log("Inside handleFormSubmit function");
        console.log("Form inside handleFormSubmit function");
        console.log(form);

        const createItem = async (form) => {

            let newItem =
            {
                type: form.type,
                name: form.name,
                description: form.description,
                materials: form.materials,
                size: form.size,
                price: form.price,
                image: form.image,
            }

            console.log(newItem);
            const URL = API_URL;
            console.log("URL:");
            console.log(URL);
            const resp = await axios.post(URL, newItem)
                .then(navigation.push("Crafts", { type: form.type }))
                .catch((error) => console.log('Error: ', error));
        }

        createItem(form);

    }


    //=====================================================
    return (
        <KeyboardAvoidingView
            behavior={"height"}
            keyboardVerticalOffset={0}
            enabled={false}
            style={styles.container} >

            <View style={styles.titleContainer}>
                <Text style={styles.text}>Add a new craft</Text>
            </View>

            <View style={[styles.miniContainer]}>
                <AddNewItemForm onSubmit={handleFormSubmit} />
            </View>

            <View style={styles.btnContainer}>
                <Separator />
                <Pressable
                    style={styles.btnPressMe}
                    onPress={() => navigation.push("Home")}>
                    <Text style={styles.btnText}>GoHome</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
    },

    btnContainer: {
        flex: 0.1,
        backgroundColor: "rgba(108, 56, 32, 0.83)",
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    titleContainer: {
        flex: 0.1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: "rgba(89, 31, 5, 0.83)",
    },

    miniContainer: {
        borderColor: "black",
        borderWidth: 1,
        flex: 0.8,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    imageName: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },

    image: {
        width: '50%',
        height: windowWidth * 0.5,
        borderRadius: 10,
    },

    separator: {
        marginVertical: 20,
    },

    btnText: {
        color: "#daa520",
        fontSize: 24,
        fontWeight: "bold",
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        width: "80%"
    },

    btnPressMe: {
        paddingVertical: 10,
        paddingLeft: 100,
        paddingRight: 20,
        backgroundColor: "gray"
    },
    text: {
        fontSize: 24,
        color: "#daa520",
        fontStyle: "italic",
        fontWeight: "bold",
        marginLeft: 20,
        marginTop: 15,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
});

export default AddNewItemScreen;