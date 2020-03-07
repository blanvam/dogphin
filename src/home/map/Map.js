import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native'; 
import { View } from 'native-base';
import MapView from 'react-native-maps';

import mapStyle from './mapStyle.json';

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})

export default class Map extends Component {
    render() {
        let {height, width} = Dimensions.get('window');
        return (
            <View style={{height:height, width: width}}>
                <MapView
                    style={[styles.map]}
                    // mapType="satellite"
                    customMapStyle={mapStyle}
                    region={{
                        latitude: 36.374665,
                        longitude: -6.240144,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    }}
                />
            </View>
        );
    }
}