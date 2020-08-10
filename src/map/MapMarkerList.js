import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'

import MapMarker from './MapMarker'
import * as mapActions from './map.actions'

const styles = StyleSheet.create({
  marker: {
    marginTop: 0,
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
  },
  iconMarker: {
    marginTop: 0,
    fontWeight: 'bold',
    textAlign: "center", 
  },
  userMarker: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  userIconMarker: {
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: "center", 
  },
  meNotmarker: {
    backgroundColor: '#60f0f0',
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
  },
  meMarker: {
    backgroundColor: '#00576a',
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
  },
})


const MapMarkerList = props => {

  showErrorAndGoLogin = () => {
    Toast.show({
      text: 'Debe logearse para poder ver el número!',
      type: "warning",
      buttonText: "Vale",
      duration: 6000,
      position: "top"
    })
    props.navigation.navigate('Login')
  }

  linkToPhone = () => {
    Linking.openURL(`tel:${props.user.phoneNumber}`)
  }

  getCallout = () => {
    if (props.user.email) {
      if (props.user.phoneNumber) {
        return linkToPhone
      } else {
        return false
      }
    } else {
      return showErrorAndGoLogin
    }
  }

  get_markers = () => {
    props.setMapMarkers([])
    let markers = props.notifications.map(item => {
      let config = props.config.alerts.concat([props.config.emergency]).find(i => i.id === item.type)
      return <MapMarker 
        prefixId='notifications'
        item={item}
        config={config}
        addMarkers={props.addMapMarkers}
        markerStyle={(item.user === props.user.uid) ? styles.meNotmarker: styles.marker}
        iconMarkerStyle={styles.iconMarker}
        zIndex={(config.id == 'emergency') ? 99 : 98 }
        callout={getCallout()}
      />
    })
    let nearUsers = props.nearUsers.map(item => {
      return <MapMarker
        prefixId='users'
        item={item}
        config={props.config.user}
        addMarkers={(_) => {}}
        markerStyle={(item.id === props.user.uid) ? styles.meMarker: styles.userMarker}
        iconMarkerStyle={styles.userIconMarker}
        zIndex={97}
        callout={getCallout()}
      />
    })
    return markers.concat(nearUsers)
  }
  
  return (
    <>
      {get_markers()}
    </>
  )

}

const mapStateToProps = state => {
  return {
    config: state.home.config,
    user: state.user.user,
    nearUsers: state.user.nearUsers,
    notifications: state.notification.notifications,
    markersRef: state.map.markersRef,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMapMarkers: (value) => dispatch(mapActions.setMapMarkers(value)),    
    addMapMarkers: (id, ref) => dispatch(mapActions.addMapMarkers(id, ref)),    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapMarkerList)