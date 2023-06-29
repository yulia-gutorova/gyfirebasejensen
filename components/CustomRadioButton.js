import React from 'react';
import { View, 
        Text, 
        Pressable, 
        StyleSheet } from 'react-native';
import { useState } from "react"

export default function CustomRadioButton({ data, option, onSelect }) {

    const [userOption, setUserOption] = useState(option);
    const [selected, setSelected] = useState(null);

    const selectHandler = (value) => {
        onSelect(value);
        setUserOption(value); 
    };


  //=====================================================
  return (
    <View style={{display: "flex",  width:"100%", justifyContent: "center"}}>
      {data.map((item) => {
        return (
          <Pressable  key={item} style={[styles.pressable, item === userOption ? styles.selected : styles.unselected]} 
                      onPress={() => selectHandler(item)}> 
                      <Text style={styles.option}> {item}</Text>
          </Pressable>
        )
      })}
    </View>
  );
}

//-------------- Styles-----------------------------
const styles = StyleSheet.create({
  option: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  unselected: {
    backgroundColor: 'brown',
    //margin: 6,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: 'red',
    borderRadius: 10,
    //margin: 7,
  },

  pressable: {
    width:"100%",
    paddingVertical: 5, 
    marginTop: 6,
  }
});
