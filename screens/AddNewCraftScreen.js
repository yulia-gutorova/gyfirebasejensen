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

;
import AddNewCraftForm from '../components/AddNewCraftForm';
import { configDotenv } from 'dotenv';


const Separator = () => <View style={styles.separator} />;

const AddNewCraftScreen = ({ navigation }) => {

    //const [images, setImages] = useState([]);
    const isDarkMode = useColorScheme() === 'dark';

    const handleFormSubmit = (form) => {

        console.log("Inside handleFormSubmit function in AddNewCraftScreen");
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
                imageObject: form.imageObject,
                image: form.image,
                
            }

            console.log("NewItem inside createItem function");
            console.log(newItem);

            const URL = API_URL;
            //console.log("URL:");
            //console.log(URL);
            let resp = await axios.post(URL, newItem)
                .then(resp = await axios.get(URL))
                .catch((error) => console.log('Error: ', error));
        }

        createItem(form);
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
                <Text style={styles.text}>Add a new craft</Text>
            </View>

            <View style={[styles.miniContainer]}>
                <AddNewCraftForm onSubmit={handleFormSubmit} />
            </View>

            <View style={styles.btnContainer}>
                <Pressable
                    style={styles.btnPressMe}
                    onPress={() => navigation.push("Home")}>
                    <Text style={styles.btnText}>Go Back</Text>
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

export default AddNewCraftScreen;