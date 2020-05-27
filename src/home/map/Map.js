import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions } from 'react-native'
import { View } from 'native-base'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import firestore from '@react-native-firebase/firestore'

import * as userActions from '../../user/user.actions'
import userServices from '../../user/user.services'
//import mapStyle from './mapStyle.json'

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
})
const {height, width} = Dimensions.get('window');


const Map = props => {

  const [region, setRegion] = useState({
    latitude: props.location.latitude,
    longitude: props.location.longitude,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  })
  const [watchID, setWatchID] = useState(null)
  const [mapRef, setMapRef] = useState(null)
 
  useEffect(() => { 
    console.log(`${props.permissionsGranted} && ${watchID} && ${!watchID} && ${watchID == null}`)
    if (props.permissionsGranted && !watchID) {
      set_geolocation()
    } else if (watchID) {
      move(props.location.latitude, props.location.longitude)
    }
    return (() => {
      watchID && Geolocation.clearWatch(watchID)
    })
  }, [props.permissionsGranted, props.location])

  set_geolocation = () => {
    console.log('setting location')
    Geolocation.setRNConfiguration({"authorizationLevel": "always"})
    Geolocation.getCurrentPosition(
      position => { move(position.coords.latitude, position.coords.longitude)},
      error => console.log('Error getCurrentPosition', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000},
    )
    let watchID = Geolocation.watchPosition(
      position => { move(position.coords.latitude, position.coords.longitude)},
      error => console.log('Error watchPosition', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000, distanceFilter: 200},
    )
    setWatchID(watchID)
  }

  move = (latitude, longitude) => {
    console.log(`moving to lat ${latitude} - lon ${longitude}`)
    let newRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    }
    mapRef.animateToRegion(newRegion, 5000)
  }

  set_region = (region) => {
    setRegion(region)
    let actualLocation = {latitude: region.latitude, longitude: region.longitude}
    // TODO send to firestore actual location (new firestore.GeoPoint(53.483959, -2.244644))
    let location = new firestore.GeoPoint(region.latitude, region.longitude)
    userServices.update(
      props.user.email,
      {currentLocation: location},
      () => { props.updateLocation(actualLocation) }
    )
  }

  
  return (
    <View style={{height:height, width: width}}>
      <MapView
        ref={(ref) => setMapRef(ref)}
        style={[styles.map]}
        mapType="hybrid"
        //customMapStyle={mapStyle}
        region={region}
        onRegionChangeComplete={(v) => set_region(v)}
        showsUserLocation={true}
        followsUserLocation={true}
        loadingEnabled={true}
      >
        {props.markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  )

}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    location: state.user.location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateLocation: (location) => dispatch(userActions.updateLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)