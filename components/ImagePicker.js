import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = ({ onImageTaken }) => {
    const [pickedImage, setPickedImage] = useState();
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        setPickedImage(image.uri);
        onImageTaken(image.uri);
    };
    return <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {!pickedImage ? (
                <Text>No image picked yet.</Text>
            ) : (
                    <Image style={styles.image} source={{ uri: pickedImage }} />
                )}
        </View>
        <Button title='Take Image' color={Colors.primary} onPress={takeImageHandler} />
    </View>
};

const styles = StyleSheet.create({
    imagePicker: {
        justifyContent: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImgPicker;