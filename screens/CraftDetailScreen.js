import { useState, useCallback } from "react"
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    FlatList,
    Image, 
    Alert
} from "react-native";
import axios from "axios";

import { API_URL } from "@env"


const Separator = () => <View style={styles.separator} />;

const CraftDetailScreen = ({ navigation, route }) => {

    //const [craftItems, setCraftItems] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const isFocused = useIsFocused();

    console.log("Route admin in CraftDetailScreen");
    console.log(route.params.admin);

    //let type = route.params.craft.item.type;
    let craft = route.params.craft.item;
    let admin = route.params.admin;

    useFocusEffect(
        useCallback((type) => {
            setShowImage(false);
        }, [isFocused])
    );  

    const handleShowImage = () => {
        setShowImage(!showImage);
    }

    //---------------------------------------------------------
    const handleDeleteCraft = (id) => {

        //---------------------------------------------------------
        const deleteCraft = async () => {
            const URL = API_URL;
            let url = URL + "/" + id;
            let resp = await axios.delete(url)
                .then(resp = await axios.get(URL))
                .catch((error) => console.log('Error: ', error));
        };

        Alert.alert
        (
            'Do you really want to delete this craft?',
            '',
            [
                {text: 'Yes', onPress: () => {  deleteCraft(id); 
                                                navigation.navigate("Crafts", { type: route.params.craft.item.type, admin : admin})}},
                {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
            ],
            {cancelable: false},
            //clicking out side of alert will not cancel
          );
    }

    //---------------------------------------------------------
    const handleMarkCraftSold = (id, name) => {
        //console.log("Inside handleMarkCraftSold");
        //console.log(id);
        //console.log(name);
        //---------------------------------------------------------
        const updateCraft = async () => {

            let updatedCraft = {
                name: name,
                status: false
            }
            const URL = API_URL;
            let url = URL + "/" + id;

            let resp = await axios.patch(url, updatedCraft)
                .then(resp = await axios.get(URL))
                .catch((error) => console.log('Error: ', error));
        };

        updateCraft();
        navigation.navigate("Crafts", { type: route.params.craft.item.type, admin: admin})
    }

    const ability = route.params.craft.item.status ? "Available" : "Unavailable"

    //=====================================================
    return (
        <>
            {route.params.craft.item.imageObject.imageUrl !== "" ? <ImageBackground style={styles.container} source={{ uri: `${route.params.craft.item.imageObject.imageUrl}`}}>

                <View style={styles.titleContainer}>
                    <Pressable
                        style={styles.btnShowImage}
                        onPress={handleShowImage}>
                        {showImage === false ? <Text style={styles.titleText}>Hide description</Text> : <Text style={styles.titleText}>Show description</Text>}

                    </Pressable>
                </View>

                <View style={styles.detailContainer}>
                    <View style={[styles.descriptionDetailContainer, showImage === false ? styles.hideImage : styles.showImage]}>

                        <Text style={[styles.detailText, { fontStyle: "italic" }]}>{route.params.craft.item.description}</Text>
                        <Text style={[styles.titleText, { fontSize: 28, marginBottom: 10 }]}>{route.params.craft.item.name}</Text>
                        <Text style={styles.detailText}>Materials: {route.params.craft.item.materials}</Text>
                        <Text style={styles.detailText}>Size:  {route.params.craft.item.size}</Text>
                        <Text style={styles.detailText}>Price:  {route.params.craft.item.price}</Text>
                        <Text style={[styles.detailText, { color: route.params.craft.item.status ? "darkgreen" : "red" }, { fontSize: 24 }]}>{ability}</Text>

                        <View style={styles.buttonsDetailContainer}>
                            <Pressable
                                style={styles.btnDetailContainer}
                                onPress={() => navigation.navigate("Update", { craft: { craft }, admin : admin})}>
                                <Text style={[styles.btnText, { color: "white" }]}>Update </Text>
                            </Pressable>
                            <Pressable
                                style={styles.btnDetailContainer}
                                onPress={() => handleDeleteCraft(route.params.craft.item._id)}>
                                <Text style={[styles.btnText, { color: "white" }]}>Delete</Text>
                            </Pressable>
                            {route.params.craft.item.status === true ? <Pressable
                                style={styles.btnDetailContainer}
                                onPress={() => handleMarkCraftSold(route.params.craft.item._id, route.params.craft.item.name)}>
                                <Text style={[styles.btnText, { color: "white" }]}>Sold</Text>
                            </Pressable> : null}
                        </View>

                    </View>
                </View>

                <View style={styles.btnContainer}>
                    <Pressable
                        style={styles.btnBack}
                        onPress={() => navigation.push("Crafts", { type: route.params.craft.item.type, admin: admin})}>
                        <Text style={styles.btnText}>Back</Text>
                    </Pressable>
                </View>


            </ImageBackground> : null}
        </>


    )
}

//-------------- Styles-----------------------------
const styles = StyleSheet.create({

    //------------------ Containers --------------------------------
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        width: "100%", 
        height:'100%',
        resizeMode: 'cover'
    },

    //-------------------------------------------------------------
    btnContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(108, 56, 32, 0.83)",
        borderTopLeftRadius: 500,
        borderTopRightRadius: 200,
        alignItems: 'flex-end',
        justifyContent: 'center',
        //backgroundColor: "gray",
    },

    //-------------------------------------------------------------
    btnDetailContainer: {
        paddingVertical: 20,
        paddingLeft: 10,
        paddingRight: 10,
        //backgroundColor: "gray"
    },

    //-------------------------------------------------------------
    titleContainer: {
        flex: 1,
        width: "100%",
        paddingTop: 0,
        backgroundColor: "rgba(108, 56, 32, 0.83)",
        borderBottomRightRadius: 500,
        borderBottomLeftRadius: 200,
        //opacity: 0.8
    },

    //-------------------------------------------------------------
    detailContainer: {
        flex: 6,
        //backgroundColor: "white",
        marginVertical: 20,
        borderRadius: 20,
        width: "90%",
        //alignItems: 'center',
        //opacity: 0.8
    },

    //-------------------------------------------------------------
    descriptionDetailContainer: {
        flex: 1,
        backgroundColor: "rgba(175, 163, 151, 0.44)",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "100%",
        alignItems: 'center',
    },

    //-------------------------------------------------------------
    buttonsDetailContainer: {
        flexDirection: "row"
    },

    //------------------------ Image ------------------------------
    image: {
        height: 200,
        width: "100%",
        resizeMode: "contain",
        marginTop: 30
    },

    hideImage: {
        display: "flex"
    },

    showImage: {
        display: "none"
    },

    //------------------------ Text ------------------------------
    titleText: {
        fontSize: 28,
        color: "#daa520",
        fontStyle: "italic",
        fontWeight: "bold",
        textAlign: "left",
        marginTop: 20,
        marginLeft: 10,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },

    detailText: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        marginTop: 5,
        marginLeft: 10,
        textShadowColor: 'gray',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,

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

    //------------------------ Buttons ---------------------------
    btnBack: {
        paddingVertical: 20,
        paddingLeft: 120,
        paddingRight: 20,
        //backgroundColor: "gray"
    },


    btnShowImage: {
        textAlign: "center",
        justifyContent: "center",
        alignSelf: "center",
    },

    //------------------------ Other -----------------------------
    separator: {
        marginVertical: 20,
    },


})

export default CraftDetailScreen