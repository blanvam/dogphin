import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions } from 'react-native'
import { View } from 'native-base'
import MapView from 'react-native-maps'

import MapMarkerList from './MapMarkerList'
import * as userActions from '../user/user.actions'
//import mapStyle from './mapStyle.json'


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
    let coordinate = locationChangedResult.nativeEvent.coordinate
    props.updateUserLocation({latitude: coordinate.latitude, longitude: coordinate.longitude})
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
        onRegionChangeComplete={setRegion}
        onUserLocationChange={locationChanged}
      >
        <MapMarkerList />
      </MapView>
    </View>
  )

}

const mapStateToProps = state => {
  return {
    mapLocation: state.map.location,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserLocation: (location) => dispatch(userActions.updateUserLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)