/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

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

import { API_URL } from "@env"

;
import AddNewCraftForm from '../components/AddNewCraftForm';
import { configDotenv } from 'dotenv';


const Separator = () => <View style={styles.separator} />;

const AddNewCraftScreen = ({ navigation, route }) => {

    //const [images, setImages] = useState([]);
    const isDarkMode = useColorScheme() === 'dark';

    let admin  = route.params.admin;
    
    //---------------------------------------------------------
    const handleFormSubmit = (form) => {

        //---------------------------------------------------------
        //API POST to create a new craft
        //---------------------------------------------------------
        const createItem = async (form) => {

            let newItem =
            {
                type: form.type,
                name: form.name,
                description: form.description,
                materials: form.materials,
                size: form.size,
                price: form.price,
                imageObject: form.imageObject,
                image: form.image,   
            }

            let resp = await axios.post(API_URL, newItem)
                .then(resp = await axios.get(API_URL))
                .catch((error) => console.log('Error: ', error));
        }

        createItem(form);
        navigation.navigate("Crafts", { type: form.type, admin: admin })

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
                <AddNewCraftForm onSubmit={handleFormSubmit} />
            </View>

            <View style={styles.btnContainer}>
                <Pressable
                    style={styles.btnPressMe}
                    onPress={() => navigation.push("Home", {admin: admin})}>
                    <Text style={styles.btnText}>Back</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const windowWidth = Dimensions.get('window').width;

//-------------- Styles-----------------------------
const styles = StyleSheet.create({

    container: {
        flex: 1,
        margin: 0,
        backgroundColor: "rgba(176, 165, 153, 1)",
    },

    btnContainer: {
        flex: 0.1,
        backgroundColor: "rgba(108, 56, 32, 0.83)",
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderTopLeftRadius: 500,
        borderTopRightRadius: 200,
    },

    titleContainer: {
        flex: 0.1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: "rgba(89, 31, 5, 0.83)",
        borderBottomRightRadius: 500,
        borderBottomLeftRadius: 200,
    },

    miniContainer: {
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

export default AddNewCraftScreen;