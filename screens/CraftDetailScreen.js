import { useState } from "react"

import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    FlatList,
    Image
} from "react-native";

import FontAwesomeIcon, {
    SolidIcons,
    RegularIcons,
    BrandIcons,
    parseIconFromClassName,
  } from 'react-native-fontawesome';


const Separator = () => <View style={styles.separator} />;

const CraftDetailScreen = ({ navigation, route }) => {

    const [craftItems, setCraftItems] = useState([]);
    //console.log("Route params");
    //console.log(route.params);

    let image = route.params.craft.item.image;
    console.log("Route params status");
    console.log(route.params.craft.item.status);

    //const completedBookings = response.data.filter((booking: Booking) => booking.status === false);

    return (

        <ImageBackground style={styles.container} source={{ uri: `${route.params.craft.item.image}` }}>
            {/* <View style={styles.container}> */}
            <View style={styles.titleContainer}>

                    <Pressable
                        style={styles.btnShowImage}>
                        <Text style={styles.btnText}>Show only image</Text>
                    </Pressable>
            </View> 

            <View style={styles.detailContainer}>

                {/*                 <View style={styles.imageDetailContainer}>
                    <Image style={styles.image} source={{ uri: `${route.params.craft.item.image}` }} />
                </View> */}

                <View style={styles.descriptionDetailContainer}>

                    <Text style={styles.detailText}>Id: {route.params.craft.item._id}</Text>
                    <Text style={styles.detailText}>Type: {route.params.craft.item.type}</Text>
                    <Text style={styles.detailText}>Description: {route.params.craft.item.description}</Text>
                    <Text style={[styles.titleText, { fontSize: 28, marginBottom: 10 }]}>{route.params.craft.item.name}</Text>
                    <Text style={styles.detailText}>Materials: {route.params.craft.item.materials}</Text>
                    <Text style={styles.detailText}>Size:  {route.params.craft.item.size}</Text>
                    <Text style={styles.detailText}>Price:  {route.params.craft.item.price}</Text>
                    <Text style={[styles.detailText, { color: route.params.craft.item.status ? "green" : "red" }]}>Status:  {"status"}</Text>
                    
                    <View style={styles.buttonsDetailContainer}>
                        <Pressable
                            style={styles.btnDetailContainer}
                            onPress={() => navigation.push("Home")}>
                            <Text style={[styles.btnText, { color: "white" }]}>Update </Text>
                        </Pressable>
                        <Pressable
                            style={styles.btnDetailContainer}
                            onPress={() => navigation.push("Home")}>
                            <Text style={[styles.btnText, { color: "white" }]}>Delete</Text>
                        </Pressable>
                        <Pressable
                            style={styles.btnDetailContainer}
                            onPress={() => navigation.push("Home")}>
                            <Text style={[styles.btnText, { color: "white" }]}>Sold</Text>
                        </Pressable>
                    </View>


                </View>

            </View>

            <View style={styles.btnContainer}>
                <Pressable
                    style={styles.btnBack}
                    onPress={() => navigation.push("Crafts", { type: route.params.craft.item.type })}>
                    <Text style={styles.btnText}>Back</Text>
                </Pressable>
            </View>


        </ImageBackground>
    )
}

//-------------- Styles-----------------------------
const styles = StyleSheet.create({
    //-------------------------------------------------------------
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",

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

    descriptionDetailContainer: {
        flex: 1,
        backgroundColor: "rgba(175, 163, 151, 0.44)",
        //marginVertical: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "100%",
        alignItems: 'center',
        //display: "none"
    },

    /*             imageDetailContainer: {
                    flex:0.8,
                    backgroundColor: "white",
                    width: "100%",
                    //alignItems: 'center',
                }, */

    buttonsDetailContainer: {
        flexDirection: "row"
    },

    //-------------------------------------------------------------
    image: {
        height: 200,
        width: "100%",
        resizeMode: "contain",
        marginTop: 30
    },

    titleText: {
        fontSize: 28,
        color: "#daa520",
        fontStyle: "italic",
        fontWeight: "bold",
        //backgroundColor: "white",
        textAlign: "left",
        marginTop: 25,
        marginLeft: 10,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },

    detailText: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        //marginLeft: 20,
        ///textAlign: "left",
        marginTop: 5,
        marginLeft: 10,
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
        //backgroundColor: "white",
    },

    separator: {
        marginVertical: 20,
    },

    btnBack: {
        paddingVertical: 20,
        paddingLeft: 120,
        paddingRight: 20,
        //backgroundColor: "gray"
    },

    btnDetailContainer: {
        paddingVertical: 20,
        paddingLeft: 10,
        paddingRight: 10,
        //backgroundColor: "gray"
    },

    btnShowImage: {
        textAlign: "center",
        justifyContent: "center",
        alignSelf: "center",
    }

})

export default CraftDetailScreen