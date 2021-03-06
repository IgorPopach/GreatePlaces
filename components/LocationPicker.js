import React, { useState, useEffect } from 'react';
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = ({ navigation, onLocationPicked }) => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    const mapPickedLocation = navigation.getParam('pickedLocation');

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation)
        }
        onLocationPicked(mapPickedLocation);
    }, [mapPickedLocation, onLocationPicked]);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return;
        }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
            setPickedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            onLocationPicked({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
        } catch (err) {
            Alert.alert(
                'Could not fetch location!',
                'Please try again later or pick a location on the map',
                [{ text: 'Okay' }]
            );
        }
        setIsFetching(false);
    };

    const pickOnMapHandler = () => {
        navigation.navigate('Map')
    };
    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler} >
                {isFetching ?
                    <ActivityIndicator size='large' color={Colors.primary} /> :
                    <Text>No location chosen yet!</Text>}
            </MapPreview>
            <View style={styles.actions}>
                <Button title='Get User Location' color={Colors.primary} onPress={getLocationHandler} />
                <Button title='Pick On Map' color={Colors.primary} onPress={pickOnMapHandler} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationPicker;