import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Text, Alert, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '../constants/Colors';

const MapScreen = ({ navigation }) => {
    const initialLocation = navigation.getParam('initialLocation');
    const readonly = navigation.getParam('readonly');
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    const mapRegion = useMemo(() => selectedLocation ?
        {
            ...selectedLocation,
            latitudeDelta: 0.0200,
            longitudeDelta: 0.0100
        } : {
            latitude: 50.595845,
            longitude: 26.267071,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221
        }, [selectedLocation]);
    const selectLocationHandler = e => {
        if (readonly) {
            return;
        }
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setSelectedLocation({
            latitude,
            longitude
        });
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('Nothing for saving!', 'Please pick location on map first!', [{ text: 'Okay' }]);
            return;
        }
        navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
    }, [selectedLocation])

    useEffect(() => {
        navigation.setParams({ saveLocation: savePickedLocationHandler })
    }, [savePickedLocationHandler]);

    let markerCoordinates;
    if (selectedLocation) {
        const { latitude, longitude } = selectedLocation;
        markerCoordinates = {
            latitude,
            longitude
        }
    }
    return <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler} >
        {selectedLocation && <Marker title='Picked Location' coordinate={markerCoordinates} />}
    </MapView>
};

MapScreen.navigationOptions = ({ navigation }) => {
    const saveFn = navigation.getParam('saveLocation');
    const readonly = navigation.getParam('readonly');
    if (readonly) {
        return;
    }
    return {
        headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default MapScreen;