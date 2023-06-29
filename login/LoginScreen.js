import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    ImageBackground,
    Dimensions} from "react-native";

const Separator = () => <View style={styles.separator} />;

const LoginScreen = ({ navigation }) => {

    const [loginWithPassword, setLoginWithPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);
    const [attempt, setAttempt] = useState(false);
    const [adminMode, setAdminMode] = useState(false);


    const passwordHanler = () => {
        //console.log(password);

        if (password !== "admin"){
            setWrongPassword(true); 
            setAttempt(true)
        }
        else {
            setAdminMode(true); 
            navigation.navigate("Home", {admin: true});
        }
    }


    //=====================================================
    return (
        <ImageBackground style={styles.container} source={require('../assets/owl-login.jpg')}>

            <View style={styles.insideContainer}>

                {!loginWithPassword ?
                    <View style={styles.btnContainer}>

                        <Pressable
                            style={styles.btnPressMe}
                            onPress={() => navigation.push("Home", {admin: adminMode})}>
                            <Text style={styles.btnText}>Guest</Text>
                        </Pressable>


                        <Pressable
                            style={[styles.btnPressMe, { marginRight: 150 }]}
                            onPress={() => setLoginWithPassword(!loginWithPassword)}>
                            <Text style={styles.btnText}>Admin</Text>
                        </Pressable>
                    </View> : null}

                {loginWithPassword ?
                    <View style={styles.loginContainer}>

                        <View>
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor="#003f5c"
                                secureTextEntry={true}
                                onChangeText={(password) => setPassword(password)}
                            />
                            {(password !== "admin" && attempt !== false) ? <Text style={styles.messageText}>Invalid password! Try again.</Text> : null}

                        </View>

                        <Pressable
                            style={[styles.btnLogIn, { marginRight: 0 }]}
                            onPress={passwordHanler}>
                            <Text style={styles.btnText}>Log in</Text>
                        </Pressable>
                    </View> : null}

            </View>


        </ImageBackground>
    )

}

//-------------- Styles-----------------------------
const d = Dimensions.get("window");

const styles = StyleSheet.create({


    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: d.width,
        height: d.height,
    },

    insideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        marginVertical: 20,
        opacity: 0.9,
    },

    btnContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        //backgroundColor: "rgba(71, 32, 14, 0.83)",
        width: "100%",
        opacity: 1,
        //borderRadius: 10,
    },

    loginContainer: {
        flex: 1,
        flexDirection: "row",
        //backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
    },

    /*     inputView: {
            flex: 1,
            backgroundColor: "#FFC0CB",
            borderRadius: 30,
            width: "70%",
            height: 45,
            marginBottom: 20,
            alignItems: "center",
        }, */

    textInput: {
        marginTop: 35,
        height: 50,
        width: 200,
        padding: 10,
        //marginLeft: 20,
        backgroundColor: "rgba(23, 0, 0, 0.58)",
        borderWidth: 1,
        borderColor: "#daa520",
        color: "white",

    },

    btnText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        //backgroundColor: "white",
        //width: "80%"
    },

    messageText: {
        color: "red",
        fontStyle: "italic",
        fontSize: 18,
        fontWeight: "bold",
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },

    separator: {
        marginVertical: 10,
    },

    btnPressMe: {
        width: 150,
        height: 150,
        paddingHorizontal: 5,
        paddingVertical: 3,
        alignItems: 'center',
        justifyContent: 'center',
        //textAlign: "center",
        borderWidth: 1,
        borderColor: "#daa520",
        borderRadius: 75,
        backgroundColor: "rgba(71, 32, 14, 0.83)",
        margin: 10
    },

    btnLogIn: {
        backgroundColor: "gray",
        width: 100,
        height: 100,
        paddingHorizontal: 5,
        paddingVertical: 3,
        alignItems: 'center',
        justifyContent: 'center',
        //textAlign: "center",
        borderWidth: 1,
        borderColor: "#daa520",
        borderRadius: 75,
        backgroundColor: "rgba(71, 32, 14, 0.83)",
        margin: 10
    },

    btnGoBack: {
        marginBottom: 20,
        backgroundColor: "rgba(71, 32, 14, 0.83)",

        //width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#daa520",
        borderRadius: 10,
    },

    btnGoBackText: {
        color: "white",
        fontSize: 18,

    },

})

export default LoginScreen 
