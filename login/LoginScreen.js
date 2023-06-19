import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    ImageBackground,
} from "react-native";

const Separator = () => <View style={styles.separator} />;

const LoginScreen = ({ navigation }) => {

    const [loginWithPassword, setLoginWithPassword] = useState(false);
    const [password, setPassword] = useState(false);

    return (
        <ImageBackground style={styles.container} source={require('../assets/owl-login.jpg')}>

            <View style={styles.insideContainer}>

                {!loginWithPassword ? <View style={styles.btnContainer}>

                    <Pressable
                        style={styles.btnPressMe}
                        onPress={() => navigation.push("Home")}>
                        <Text style={styles.btnText}>Guest</Text>
                    </Pressable>


                    <Pressable
                        style={[styles.btnPressMe,{marginRight: 150}]}
                        onPress={() => navigation.push("Home")}>
                        <Text style={styles.btnText}>Admin</Text>
                    </Pressable>

                </View> : null}

                <View>
                </View>

                {loginWithPassword ? <TextInput
                    style={styles.textInput}
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                /> : null}
            </View>


        </ImageBackground>
    )
}

//-------------- Styles-----------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(237, 230, 224, 0.83)",
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

    inputView: {
        flex: 1,
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    textInput: {
        marginTop: 100,
        height: 50,
        width: 200,
        padding: 10,
        marginLeft: 20,
        backgroundColor: "gray"
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

    separator: {
        marginVertical: 10,
    },

    btnPressMe: {
        backgroundColor: "gray",
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
