import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions } from 'react-native'
import { View } from 'native-base'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import firestore from '@react-native-firebase/firestore'

import * as userActions from '../../user/user.actions'
import userServices from '../../user/user.services'
import mapStyle from './mapStyle.json'

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
})
const {height, width} = Dimensions.get('window');


class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: props.location.latitude,
        longitude: props.location.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      timestamp: null,
      watchID: null
    }
  }

  componentDidMount() {
    if (this.props.permissionsGranted) {
      this._set_geolocation()
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.permissionsGranted && this.props.permissionsGranted != prevProps.permissionsGranted) {
        this._set_geolocation()
      }
  }

  componentWillUnmount() {
    this.state.watchID != null && Geolocation.clearWatch(this.state.watchID)
  }

  _set_geolocation() {
    Geolocation.setRNConfiguration({"authorizationLevel": "always"})
    Geolocation.getCurrentPosition(
      position => {this._move(position.coords.latitude, position.coords.longitude)},
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
    )
    let watchID = Geolocation.watchPosition(
      position => { this._move(position.coords.latitude, position.coords.longitude)},
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 50},
    )
    this.setState({ watchID })
  }

  _move(latitude, longitude) {
    let newRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: this.state.region.latitudeDelta,
      longitudeDelta: this.state.region.longitudeDelta
    }
    this.mapRef.animateToRegion(newRegion, 5000)
  }

  _set_region(region) {
    this.setState({ region })
    let actualLocation = {latitude: region.latitude, longitude: region.longitude}
    // TODO send to firestore actual location (new firestore.GeoPoint(53.483959, -2.244644))
    let location = new firestore.GeoPoint(region.latitude, region.longitude)
    userServices.update(
      this.props.user.email,
      {currentLocation: location},
      () => { this.props.updateLocation(actualLocation) }
    )
  }

  render() {
    return (
      <View style={{height:height, width: width}}>
        <MapView
          ref={(ref) => this.mapRef = ref}
          style={[styles.map]}
          mapType="satellite"
          customMapStyle={mapStyle}
          region={this.state.region}
          onRegionChangeComplete={(v) => this._set_region(v)}
          showsUserLocation={true}
          followsUserLocation={true}
          loadingEnabled={true}
        >
          {this.props.markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
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