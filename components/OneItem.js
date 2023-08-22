import { View, StyleSheet, Text, Image } from "react-native"
import React from "react"

const OneItem = ({ key ,title, craft}) => {

  //=====================================================
  return (
    <View style={styles.item}>
      <View style={{flex: 0.8}}>
        <Text style={styles.title}>{craft.item.name}</Text>
      </View>
      <View>
        <Image source={{ uri: `${craft.item.image}`}} style={styles.image} />
      </View>
    </View>
  )
};

//-------------- Styles-----------------------------
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: 'rgba(215, 202, 190, 0.83)',
    paddingVertical: 10,
    margin: 20,
    width: 300,
    borderRadius: 10,
    opacity: 1
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    maxWidth: 150,

  },

  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  }
});

export default OneItem