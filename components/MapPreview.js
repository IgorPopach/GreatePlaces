import React, { useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import ENV from '../env';

const MapPreview = ({ location, children, onPress, style }) => {
    let imagePreviewUrl;

    if (location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?
        center=${location.latitude},${location.longitude}&zoom=13&size=400x200&maptype=roadmap
        &markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}
        &key=${ENV.googleApiKey}`;
    }

    return <TouchableOpacity {...{ style, onPress }}>
        {location ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} /> : children}
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    mapImage: {
        width: '100%',
        height: '100%'
    }
});

export default MapPreview;