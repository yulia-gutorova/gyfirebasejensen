import React from 'react';
import { useState, useCallback,useEffect } from "react"
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    FlatList,
    Image
} from "react-native";

import OneItem from '../components/OneItem';

import axios from 'axios';


const CraftsScreen = ({ navigation, route }) => {

    let type = route.params.type;
    const [crafts, setCrafts] = useState([]);
    //const [typeCtafts, setTypeCrafts] = useState ("");
    const isFocused = useIsFocused();

    //-----------------------------------------------------
    //useFocusEffect to get all recipes when navigating 
    //to RecipeScreen
    //-----------------------------------------------------
    useFocusEffect(

        useCallback((type) => {
            console.log("inside useFocusEffect");
            console.log("Type outside");
            console.log(type);
            const getAllCrafts = async (type) => {
                console.log("In get all crafts function");
                const resp = await axios.get('https://hobby-app-server-production.up.railway.app/crafts')
                    .then(resp => {
                        console.log("Responce");
                        console.log(resp.data);
                        setCrafts(resp.data);
                    })
                    .catch((error) => console.log('Error: ', error));
            };
            getAllCrafts(type);

        }, [isFocused])
    );

    //-----------------------------------------------------
    //useEffect to get all recipes when navigating 
    //to RecipeScreen
    //-----------------------------------------------------
    useEffect(() => 
    { 
        const getAllCrafts = async (type) => 
        {
            console.log("inside useEffect");
            const resp = await axios.get('https://hobby-app-server-production.up.railway.app/crafts')
            .then(resp => {
                console.log("Responce");
                console.log(resp.data);
                setCrafts(resp.data);
            })
            .catch((error) => console.log('Error: ', error));
    };
            getAllCrafts(type);

    }, []);


    let typeCrafts = crafts.filter(item => item.type === type);


    //console.log("Crafts outside");
    //console.log(crafts);
    //console.log("Type Crafts");
    //console.log(typeCrafts);

    //=====================================================
    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text style={styles.text}>{type}</Text>
            </View>

            <View style={styles.flatlistContainer}>
                {typeCrafts.length === 0 ? <Text style={styles.text}>You still don't have any crafts here.</Text> : null}
                <FlatList
                    style={styles.flatlist}
                    key={type}
                    keyExtractor={item => item.id}
                    data={typeCrafts}
                    showsVerticalScrollIndicator
                    renderItem={({ item }) => {
                        return (
                        <>
                            <Pressable onPress={() => navigation.navigate("CraftDetail", { title: item.name, craft: { item } })}>
                                <OneItem key={item.id} title={item.name} craft={{ item }} />
                            </Pressable>
                        </>
                        )}}
                />
            </View>

            <View style={styles.btnContainer}>
                <Pressable
                    style={styles.btnPressMe}
                    onPress={() => navigation.push("Home")}>
                    <Text style={styles.btnText}>Home</Text>
                </Pressable>
            </View>

        </View>
    )
}

//-------------- Styles-----------------------------
const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(237, 230, 224, 0.83)",
        width: "100%",
    },

    btnContainer: {
        flex: 0.1,
        width: "100%",
        backgroundColor: "rgba(108, 56, 32, 0.83)",
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    titleContainer: {
        flex: 0.1,
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 0,
        backgroundColor: "rgba(89, 31, 5, 0.83)",
    },

    flatlistContainer: {
        flex: 0.8,
        backgroundColor: "rgba(0, 0, 0, 0.62)",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainer: {
        flex: 0.4,
        width: "100%",
    },

    flatlist: {
        maxHeight: 500,
    },

    text: {
        fontSize: 24,
        color: "#daa520",
        fontStyle: "italic",
        fontWeight: "bold",
        textAlign: "right",
        marginTop: 25,
        marginLeft: 10,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },

    btnText: {
        color: "#daa520",
        fontSize: 24,
        fontWeight: "bold",
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        marginLeft: 0,
    },

    btnPressMe: {
        paddingVertical: 10,
        paddingLeft: 120,
        paddingRight: 20,
    },

    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover"
    }

})

export default CraftsScreen

