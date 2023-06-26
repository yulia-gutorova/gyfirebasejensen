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

import { API_URL } from "@env"


import UpdateCraftForm from '../components/UpdateCraftForm';
import { configDotenv } from 'dotenv';


const Separator = () => <View style={styles.separator} />;

const UpdateCraftScreen = ({ navigation, route }) => {

    let craftToUpdate = route.params.craft;
    console.log("Craft to update in UpdateCraftScreen");
    console.log(craftToUpdate);


    const isDarkMode = useColorScheme() === 'dark';

    const handleFormSubmit = (form) => {

        console.log("Inside handleFormSubmit function in update screen");
        console.log("Form inside handleFormSubmit function in update screen");
        console.log(form);

        const updateItem = async (form) => {

            let updatedItem =
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

            console.log(updatedItem);
            const URL = API_URL;
            let url = URL + "/" + form._id
            console.log("url:");
            console.log(url);
            let resp = await axios.patch(url, updatedItem)
                .then(resp = await axios.get(URL))
                .catch((error) => console.log('Error: ', error));
        }

        updateItem(form);
        navigation.navigate("Crafts", { type: form.type })

    }


    //=====================================================
    return (
        <KeyboardAvoidingView
            behavior={"height"}
            keyboardVerticalOffset={0}
            enabled={false}
            style={styles.container} >

            <View style={styles.titleContainer}>
                <Text style={styles.text}>Update a craft</Text>
            </View>

            <View style={[styles.miniContainer]}>
                <UpdateCraftForm onSubmit={handleFormSubmit} craft = {craftToUpdate}/>
            </View>

            <View style={styles.btnContainer}>
                <Pressable
                    style={styles.btnPressMe}
                    onPress={() => navigation.navigate("Crafts", {type: craftToUpdate.craft.type})}>
                    <Text style={styles.btnText}>Back</Text>
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
        //backgroundColor: "gray"
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

export default UpdateCraftScreen;