import { View, StyleSheet,  Image } from "react-native"
import React from "react"

const ImageItem = ({ item }) => {
    return (
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.imageUrl }} />
        </View>
    );
};

//-------------- Styles-----------------------------
const styles = StyleSheet.create({
    imageContainer: {
        //flex: 1,
        //padding: 20,
        //backgroundColor: "green",
        //width: 420,
    },
    
    image: {
        width: '40%',
        height: 200,
        alignSelf: "center",
        margin: 10
    }

  });
  
  export default ImageItem