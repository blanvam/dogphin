import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions } from 'react-native'
import { View, Icon } from 'native-base'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import firestore from '@react-native-firebase/firestore'

import * as userActions from '../user/user.actions'
import userServices from '../user/user.services'
import * as mapActions from './map.actions'
//import mapStyle from './mapStyle.json'

import notificationService from '../notification/notification.service'


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
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  })
 
  useEffect(() => {
    if (props.permissionsGranted && !watchID) {
      set_geolocation()
      return (() => { 
        console.log('ADDIOS')
        watchID && Geolocation.clearWatch(watchID)
      })
    }
  }, [])

  useEffect(() => {
    if (props.permissionsGranted && !watchID) {
      set_geolocation()
      return (() => { 
        console.log('ADDIOS')
        watchID && Geolocation.clearWatch(watchID)
      })
    }
  }, [props.permissionsGranted])

  useEffect(() => {    
    if (watchID && props.mapLocation.latitude !== region.latitude && props.mapLocation.longitude !== region.longitude ) {
      move(props.mapLocation.latitude, props.mapLocation.longitude)
    }
  }, [props.mapLocation])

  moveUser = (latitude, longitude) => {
    console.log(`UUSER POSITION ${latitude} --- ${longitude}`)
    // TODO: send to firestore actual location (new firestore.GeoPoint(53.483959, -2.244644))
    props.updateUserLocation({latitude: latitude, longitude: longitude})
    let location = new firestore.GeoPoint(latitude, longitude)
    userServices.update(
      props.user.email,
      {currentLocation: location},
      () => {}
    )
    move(latitude, longitude)
  }
  
  set_geolocation = () => {
    console.log('HOLA')
    Geolocation.setRNConfiguration({"authorizationLevel": "always"})
    Geolocation.getCurrentPosition(
      position => { moveUser(position.coords.latitude, position.coords.longitude)},
      error => console.log('Error getCurrentPosition', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000},
    )
    let watchID = Geolocation.watchPosition(
      position => { moveUser(position.coords.latitude, position.coords.longitude)},
      error => console.log('Error watchPosition', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000, distanceFilter: 100},
    )
    setWatchID(watchID)
  }

  move = (latitude, longitude) => {
    console.log(`MMMAP POSITION --- ${latitude} --- ${longitude}`)
    let newRegion = {
      ...region,
      latitude: latitude,
      longitude: longitude,
    }
    mapRef.animateToRegion(newRegion, 5000)
  }

  set_region = (region) => {
    setRegion(region)
    props.updateMapLocation({latitude: region.latitude, longitude: region.longitude})
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
    mapLocation: state.map.location,
    permissionsGranted: state.user.permissions,
    notifications: state.notification.notifications,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserLocation: (location) => dispatch(userActions.updateLocation(location)),
    updateMapLocation: (location) => dispatch(mapActions.updateMapLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)