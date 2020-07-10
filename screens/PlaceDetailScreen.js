import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const PlaceDetailScreen = ({ navigation }) => {
    const placeId = navigation.getParam('placeId');
    const SelectedPlace = useSelector(state =>
        state.places.places.find(place => place.id === placeId));

    const { imageUri, address, lat, lng } = SelectedPlace;

    const selectedLocation = {
        latitude: lat,
        longitude: lng
    };

    const showMapHandler = () => {
        navigation.navigate('Map', { readonly: true, initialLocation: selectedLocation })
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <Image style={styles.image} source={{ uri: imageUri }} />
            <View style={styles.details}>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>{address}</Text>
                </View>
                <MapPreview
                    style={styles.map}
                    location={selectedLocation}
                    onPress={showMapHandler}
                />
            </View>
        </ScrollView>
    )
};

PlaceDetailScreen.navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('placeTitle');
    return {
        headerTitle: title
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '35%',
        minHeight: 300,
        backgroundColor: '#ccc'
    },
    details: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 400,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    addressContainer: {
        margin: 20
    },
    addressText: {
        color: Colors.primary,
        textAlign: 'center'
    },
    map: {
        width: '100%',
        maxWidth: 400,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden'
    }
})

export default PlaceDetailScreen;