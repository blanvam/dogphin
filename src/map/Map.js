import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions } from 'react-native'
import { View, Icon } from 'native-base'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'

import * as userActions from '../user/user.actions'
//import mapStyle from './mapStyle.json'


const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    position: 'absolute',
    top: 40,
    left: 50,
    marginLeft: -115,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    // border: '4px solid #fff',
    width: 20,
    height: 20,
    //transform: 'rotate(-45deg)'
  }
})
const {height, width} = Dimensions.get('window');


const Map = props => {

  const [watchID, setWatchID] = useState(null)
  const [mapRef, setMapRef] = useState(null)
  const [region, setRegion] = useState({
    latitude: props.mapLocation.latitude,
    longitude: props.mapLocation.longitude,
    latitudeDelta: 0.35,
    longitudeDelta: 0.35,
  })
 
  useEffect(() => {
    if (props.permissionsGranted && watchID == null) {
      set_geolocation()
      return (() => {
        watchID !== null && Geolocation.clearWatch(watchID)
      })
    }
  }, [props.permissionsGranted])

  useEffect(() => {
    if (watchID !== null && props.mapLocation.latitude !== region.latitude && props.mapLocation.longitude !== region.longitude ) {
      move(props.mapLocation.latitude, props.mapLocation.longitude)
    }
  }, [props.mapLocation])

  set_geolocation = () => {
    Geolocation.setRNConfiguration({"authorizationLevel": "always"})
    let watchID = Geolocation.watchPosition(
      position => {props.updateUserLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})},
      error => console.log('Error watchPosition', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000, distanceFilter: 100},
    )
    setWatchID(watchID)
  }

  move = (latitude, longitude) => {
    let newRegion = {
      ...region,
      latitude: latitude,
      longitude: longitude,
    }
    setRegion(newRegion)
    //mapRef.animateToRegion(newRegion, 1000)
  }

  get_markers = () => (
    props.notifications.map(item => {
      let config = props.config.alerts.concat([props.config.emergency]).find(i => i.id === item.type)
      return (
        <Marker
          key={item.id}
          coordinate={{
            latitude: item.coordinates.latitude,
            longitude: item.coordinates.longitude,
          }}
          title={config.title}
          description={config.message}
        >
          <View 
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            backgroundColor: config.backgroundColor,
          }}>
            <Icon
              style={{ 
                marginTop: 5,
                fontWeight: 'bold',
                textAlign: "center", 
                color: config.iconColor }}
              type={config.iconFont} 
              name={config.iconName} 
            />
          </View>
        </Marker>
      )
    })
  )
  
  return (
    <View style={{height:height, width: width}}>
      <MapView
        ref={(ref) => setMapRef(ref)}
        style={[styles.map]}
        mapType="hybrid"
        //customMapStyle={mapStyle}
        region={region}
        onRegionChangeComplete={(r) => setRegion(r)}
        showsUserLocation={true}
        //followsUserLocation={true}
        loadingEnabled={true}
      >
        {get_markers()}
      </MapView>
    </View>
  )

}

const mapStateToProps = state => {
  return {
    config: state.home.config,
    mapLocation: state.map.location,
    permissionsGranted: state.user.permissions,
    notifications: state.notification.notifications,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserLocation: (location) => dispatch(userActions.updateUserLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)