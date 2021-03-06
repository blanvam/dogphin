import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions } from 'react-native'
import { View } from 'native-base'
import MapView from 'react-native-maps'

import firestore from '@react-native-firebase/firestore'

import MapMarkerList from './MapMarkerList'
import * as userActions from '../user/user.actions'
//import mapStyle from './mapStyle.json'
import getDistance from './getDistance'

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
})
const {height, width} = Dimensions.get('window');


const Map = props => {
  //const [mapRef, setMapRef] = useState(null)
  const [region, setRegion] = useState({
    latitude: props.mapLocation.latitude,
    longitude: props.mapLocation.longitude,
    latitudeDelta: 0.35,
    longitudeDelta: 0.35,
  })
 
  useEffect(() => {
    if (props.mapLocation.latitude !== region.latitude && props.mapLocation.longitude !== region.longitude ) {
      move(props.mapLocation.latitude, props.mapLocation.longitude)
    }
  }, [props.mapLocation])

  move = (latitude, longitude) => {
    let newRegion = {
      ...region,
      latitude: latitude,
      longitude: longitude,
    }
    setRegion(newRegion)
    //mapRef.animateToRegion(newRegion, 1000)
  }

  locationChanged = (locationChangedResult) => {
    let dateNow = firestore.Timestamp.now()
    let dateExpiration = dateNow.toMillis() + props.expirationTimeUserUpdate
    let dateUser = (props.user.updatedAt || props.user.createdAt)
    let coordinate = locationChangedResult.nativeEvent.coordinate
    let distance = getDistance(
      {latitude: coordinate.latitude, longitude: coordinate.longitude},
      {latitude: props.mapLocation.latitude, longitude: props.mapLocation.longitude}
    )
    if (distance > props.distanceUserUpdate || dateExpiration > dateUser) {
      props.updateUserLocation({latitude: coordinate.latitude, longitude: coordinate.longitude})
    }
  }

  return (
    <View style={{height:height, width: width}}>
      <MapView
        //provider={PROVIDER_GOOGLE}
        //ref={(ref) => setMapRef(ref)}
        style={[styles.map]}
        mapType="hybrid"
        //customMapStyle={mapStyle}
        region={region}
        showsUserLocation={true}
        //followsUserLocation={true}
        loadingEnabled={true}
        userLocationUpdateInterval={60}
        onRegionChangeComplete={setRegion}
        onUserLocationChange={locationChanged}
      >
        <MapMarkerList navigation={props.navigation} />
      </MapView>
    </View>
  )

}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    mapLocation: state.map.location,
    distanceUserUpdate: state.home.config.distanceUserUpdate,
    expirationTimeUserUpdate: state.home.config.expirationTimeUserUpdate,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserLocation: (location) => dispatch(userActions.updateUserLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)