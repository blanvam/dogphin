import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Geolocation from '@react-native-community/geolocation'

import * as userActions from '../user/user.actions'

// THIS IS NOT USED. '@react-native-community/geolocation' library can be deleted
const Location = props => {

  const [watchID, setWatchID] = useState(null)

  useEffect(() => {
    if (props.permissionsGranted && watchID == null) {
      set_geolocation()
      return (() => {
        watchID !== null && Geolocation.clearWatch(watchID)
      })
    }
  }, [props.permissionsGranted])
  
  set_geolocation = () => {
    Geolocation.setRNConfiguration({"authorizationLevel": "always"})
    let watchID = Geolocation.watchPosition(
      position => {props.updateUserLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})},
      error => console.log('Error watchPosition', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000, distanceFilter: 100},
    )
    setWatchID(watchID)
  }

  return (<></>)
}

const mapStateToProps = state => {
  return {
    permissionsGranted: state.user.permissions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserLocation: (location) => dispatch(userActions.updateUserLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Location)