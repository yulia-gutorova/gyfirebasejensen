import { useState } from "react"
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    SafeAreaView,
    Button,
    KeyboardAvoidingView,
    Alert
} from "react-native"

import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';

import CustomRadioButton from "./CustomRadioButton";
import ImageItem from "./ImageItem";

const reference = storage();

//---------------------------------------------------------
const AddNewCraftForm = ({ onSubmit }) => {

    const [imageObj, setImageObj] = useState({
        imageName: "",
        imageUrl: null,
    });

    const [form, setForm] = useState({
        type: "",
        name: "",
        description: "",
        materials: "",
        size: "",
        price: "",
        imageObject: { imageName: "", imageUrl: null },
        image: "",
    });

    const types = ["Sewing", "Knitting", "Crochet", "Embroidery", "Felting"];

    //---------------------------------------------------------
    const addNewImageHander = async () => {
        await ImagePicker.launchImageLibrary
            (
                {
                    selectionLimit: 0,
                    mediaType: 'photo',
                    includeBase64: false,
                },

                async response => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.errorCode) {
                        console.log('error code', response.errorCode);
                    } else if (response.errorMessage) {
                        console.log('error message', response.errorMessage);
                    }

                    else if (response.assets) {
                        const fileUri = response.assets[0]['uri'];
                        //console.log('Uri is', fileUri);

                        const randomNumber = Math.floor(Math.random() * 100) + 1;
                        const imagePath = 'images/image-' + randomNumber * randomNumber;

                        await reference
                            .ref(imagePath)
                            .putFile(fileUri)
                            .then(async result => {
                                const url = await reference.ref(imagePath).getDownloadURL();

                                const itemData =
                                {
                                    imageName: imagePath,
                                    imageUrl: url,
                                };

                                setImageObj(itemData);
                                setForm({
                                    ...form,
                                    imageObject: itemData,
                                    image: url
                                })
                            });
                    }
                },

            );

    }


    //---------------------------------------------------------
    const onChangeCustomRadioButton = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })
    }

    //---------------------------------------------------------
    const onChangeText = (name) => (text) => {
        setForm({
            ...form,
            [name]: text
        })
    }

    //---------------------------------------------------------
    const submitHandler = (form) => {

        if (form.type.trim().length === 0 ||
            form.name.trim().length === 0 ||
            form.description.trim().length === 0 ||
            form.materials.trim().length === 0 ||
            form.size.trim().length === 0 ||
            form.price.trim().length === 0 ||
            form.imageObject.imageName.trim().length === 0 ||
            form.imageObject.imageUrl.trim().length === 0 ||
            form.image.trim().length === 0) {
            Alert.alert('Check that you have filled in all the input fields');
        }

        else { onSubmit(form) };
    }


    //=====================================================
    return (

        <View>

            <ScrollView style={styles.container}>
                {/*             <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            keyboardVerticalOffset={100}
                            behavior={"position"}> */}

                <KeyboardAvoidingView behavior={"padding"}>

                    {/* Type custom radio buttons */}
                    <View style={styles.miniContainer}>
                        <Text style={[styles.paragraph, { fontWeight: "bold" }]}>Choose type: </Text>
                        <CustomRadioButton data={types} onSelect={(value) => onChangeCustomRadioButton("type", value)} />
                    </View>

                    {/* Add Image */}
                    <View style={[styles.miniContainer]}>
                        <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Add image: </Text>
                        <View contentInsetAdjustmentBehavior="automatic" style={styles.addImageContainer}>
                            {imageObj.imageUrl !== null ? <ImageItem key={imageObj.imageName} item={imageObj} /> : null}
                            <Pressable
                                style={styles.btnAddImage}
                                onPress={addNewImageHander}>
                                <Text style={styles.btnText}>Add Image</Text>
                            </Pressable>

                        </View>
                    </View>

                    {/* Name text field */}
                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Name: </Text>
                    <TextInput
                        style={styles.input}
                        selectionColor={'black'}
                        onChangeText={onChangeText("name")}
                        value={form.name}
                    />

                    {/* Description text field */}
                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Description: </Text>
                    <TextInput
                        multiline={true}
                        selectionColor={'black'}
                        style={[styles.input, { minHeight: 50, textAlignVertical: "top"  }]}
                        onChangeText={onChangeText("description")}
                        value={form.description}
                    />

                    {/* Materials text field */}
                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Materials: </Text>
                    <TextInput
                        style={styles.input}
                        selectionColor={'black'}
                        onChangeText={onChangeText("materials")}
                        value={form.materials}
                    />

                    {/* Size text field */}
                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Size: </Text>
                    <TextInput
                        style={styles.input}
                        selectionColor={'black'}
                        onChangeText={onChangeText("size")}
                        value={form.size}
                    />

                    {/* Size text field */}
                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Price: </Text>
                    <TextInput
                        style={styles.input}
                        selectionColor={'black'}
                        onChangeText={onChangeText("price")}
                        value={form.price}
                    />


                    {/* Submit button */}
                    <Pressable
                        style={styles.btnPressMe}
                        // onPress={() => onSubmit(form)}>
                        onPress={() => submitHandler(form)}>
                        <Text style={styles.btnText}>Submit</Text>
                    </Pressable>

                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}


//-------------- Styles-----------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "rgba(176, 165, 153, 1)",
        width: 420,

    },

    miniContainer: {
        borderColor: "black",
        borderWidth: 1,
        padding: 20,
        width: 400,
        alignSelf: 'center',
        //backgroundColor: "gray"

    },

    addImageContainer: {
        margin: 20,
        width: 420,
        alignSelf: 'center',
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    imageName: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },


    btnAddImage: {
        backgroundColor: 'brown',
        margin: 6,
        borderRadius: 10,
        width: 300,
        alignSelf: 'center',
        borderRadius: 10,
    },

    btnPressMe: {
        alignSelf: 'center',
        width: 200,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: "center",
        backgroundColor: "rgba(89, 31, 5, 0.83)",
        borderRadius: 20,
        marginBottom: 200
    },

    btnText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        padding: 6
    }
})

export default AddNewCraftForm;