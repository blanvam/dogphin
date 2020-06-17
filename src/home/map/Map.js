import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions } from 'react-native'
import { View, Icon } from 'native-base'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import firestore from '@react-native-firebase/firestore'

import * as userActions from '../../user/user.actions'
import userServices from '../../user/user.services'
//import mapStyle from './mapStyle.json'

import notificationService from '../../notification/notification.service'


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

  const [region, setRegion] = useState({
    latitude: props.location.latitude,
    longitude: props.location.longitude,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  })
  const [watchID, setWatchID] = useState(null)
  const [mapRef, setMapRef] = useState(null)
 
  useEffect(() => {
    if (props.permissionsGranted && !watchID) {
      set_geolocation()
    }
    return (() => { 
      watchID && Geolocation.clearWatch(watchID)
    })
  }, [])

  useEffect(() => {
    if (props.permissionsGranted && !watchID) {
      set_geolocation()
    }
    return (() => { 
      watchID && Geolocation.clearWatch(watchID)
    })
  }, [props.permissionsGranted])

  useEffect(() => {    
    if (watchID && props.location.latitude !== region.latitude && props.location.longitude !== region.longitude ) {
      move(props.location.latitude, props.location.longitude)
    }
  }, [props.location])

  set_geolocation = () => {
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
    props.updateLocation(actualLocation)
    // TODO: send to firestore actual location (new firestore.GeoPoint(53.483959, -2.244644))
    let location = new firestore.GeoPoint(region.latitude, region.longitude)
    userServices.update(
      props.user.email,
      {currentLocation: location},
      () => {}
    )
  }

  get_markers = () => (
    props.notifications.map(item => {
      return (
        <Marker
          key={item.id}
          coordinate={notificationService.location(item)}
          title={notificationService.title(item)}
          description={notificationService.message(item)}
        >
          <View 
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            backgroundColor: notificationService.backgroundColor(item),
          }}>
            <Icon
              style={{ 
                marginTop: 5,
                fontWeight: 'bold',
                textAlign: "center", 
                color: notificationService.iconColor(item) }}
              type={notificationService.iconType(item)} 
              name={notificationService.iconName(item)} 
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
        onRegionChangeComplete={(v) => set_region(v)}
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
    user: state.user.user,
    location: state.user.location,
    permissionsGranted: state.user.permissions,
    notifications: state.notification.notifications,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateLocation: (location) => dispatch(userActions.updateLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)