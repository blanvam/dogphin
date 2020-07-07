import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'

import MapMarker from './MapMarker'
import * as notificationActions from '../notification/notification.actions'


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

  get_markers = () => {
    let markers = props.notifications.map(item => {
      let config = props.config.alerts.concat([props.config.emergency]).find(i => i.id === item.type)
      return <MapMarker 
        prefixId='notifications'
        item={item}
        config={config} 
        markerStyle={(item.user === props.user.uid) ? styles.meNotmarker: styles.marker}
        iconMarkerStyle={styles.iconMarker}
        zIndex={(config.id == 'emergency') ? 99 : 98 }
        delete={item.user === props.user.uid ? () => props.deleteNotification(item.id) : false}
      />
    })
    let nearUsers = props.nearUsers.map(item => {
      return <MapMarker
        prefixId='users'
        item={item} 
        config={props.config.user} 
        markerStyle={(item.id === props.user.uid) ? styles.meMarker: styles.userMarker}
        iconMarkerStyle={styles.userIconMarker}
        zIndex={97}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteNotification: (id) => dispatch(notificationActions.deleteNotification(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapMarkerList)