import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { addPlace } from '../store/places-action';
import Colors from '../constants/Colors';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = ({ navigation }) => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitleValue(text);
    };

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    const onLocationPicked = useCallback(coordinates => {
        setSelectedLocation(coordinates);
    }, []);

    const savePlaceHandler = () => {
        if (!selectedLocation) {
            Alert.alert('Hey Stop!:)', 'Select location please!', [{ text: 'Sure' }])
            return;
        }
        if (!selectedImage) {
            Alert.alert(`You didn't create a photo!`, 'Could you save it for me?', [{ text: 'Sure' }])
            return;
        }
        dispatch(addPlace(titleValue, selectedImage, selectedLocation));
        navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker {...{ navigation, onLocationPicked }} />
                <Button
                    title='Save Place'
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 2,
        paddingVertical: 4
    }
})

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
}

export default NewPlaceScreen;