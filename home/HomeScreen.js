import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
} from "react-native";

const Separator = () => <View style={styles.separator} />;

const HomeScreen = ({ navigation }) => {


    return (
        <ImageBackground
            source={require('../assets/owl-5.jpg')}
            style={styles.container} >

            <View style={[styles.miniContainer,
            {
                transform: [{ skewX: '40deg' }, { skewY: '30deg' },],
            },
            ]}>
                <Text style={styles.text}>Crazy Owl </Text>
                <Text style={styles.text}>would like</Text>
                <Text style={styles.text}>to present to you</Text>
                <Text style={styles.text}>her crazy world</Text>
                <Text style={styles.text}></Text>

            </View>

            <View>
                <Pressable
                    style={styles.btnLogOut}
                    onPress={() => navigation.push("Login")}>
                    <Text style={styles.btnLogOutText}>LOG OUT</Text>
                </Pressable>
            </View>



            <View style={styles.btnContainer}>

                <Separator />

                <Pressable
                    style={styles.btnPressMe}
                    onPress={() => navigation.push("Crafts", {type: "Sewing"})}>
                    <Text style={styles.btnText}>SEWING</Text>
                </Pressable>

                <Separator />


                <Pressable
                    style={styles.btnPressMe}
                    onPress={() => navigation.push("Crafts", {type: "Knitting"})}>
                    <Text style={styles.btnText}>KNITTING</Text>
                </Pressable>

                <Pressable
                    style={styles.btnPressMe}
                    onPress={() => navigation.push("Crafts", {type: "Crochet"})}>
                    <Text style={styles.btnText}>CROCHET</Text>
                </Pressable>

                <Separator />


                <Pressable
                    style={styles.btnPressMe}
                    onPress={() => navigation.push("Crafts", {type: "Embroidery"})}>
                    <Text style={styles.btnText}>EMBROIDERY</Text>
                </Pressable>

                <Separator />

                <Pressable
                    style={styles.btnPressMe}
                    onPress={() => navigation.push("Crafts", {type: "Felting"})}>
                    <Text style={styles.btnText}>FELTING</Text>
                </Pressable>


                <Separator />

                <Pressable
                    style={[styles.btnPressMe,]}
                    onPress={() => navigation.push("AddNewItem")}>
                    <Text style={[styles.btnText, { color: "#daa520" }]}> ADD NEW</Text>
                </Pressable>
            </View>


        </ImageBackground>
    )
}

//-------------- Styles-----------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        resizeMode: "cover"
    },

    btnContainer: {
        flex: 1.4,
        width: "100%",
        backgroundColor: "rgba(71, 32, 14, 0.83)",
        borderTopLeftRadius: 300,
        borderTopRightRadius: 100,
        opacity: 0.8,
        justifyContent: 'center',
    },

    miniContainer: {
        flex: 0.8,
        width: "70%",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 20
    },

    text: {
        fontSize: 24,
        color: "#daa520",
        fontStyle: "italic",
        fontWeight: "bold",
        marginLeft: 60,
        marginTop: 15,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },

    btnText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        marginLeft: 130,
        width: "80%"
    },

    separator: {
        marginVertical: 0,
    },

    btnPressMe: {
        paddingVertical: 10,
        paddingLeft: 100,
    },

    btnLogOut: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: "rgba(71, 32, 14, 0.83)",
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 20,
        marginTop: 0,
    },

    btnLogOutText: {
        color: "#daa520",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "italic",
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    }


})

export default HomeScreen