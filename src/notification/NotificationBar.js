import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import TextTicker from 'react-native-text-ticker'
import { Item, Icon, View } from 'native-base'

import * as mapActions from '../map/map.actions'

const NotificationBar = props => {

  const [index, setIndex] = useState(0)

  scrollNext = useCallback(async() => {
    let nextIndex = 0
    if (index < props.config.notificationsBarShow - 1) {
      nextIndex = index + 1
    }
    setIndex(nextIndex)
  })

  useEffect(() => {}, [props.notifications])

  useEffect(() => {
    const timeout = setInterval(scrollNext, 10000) 
    return () => clearInterval(timeout)
  }, [index, scrollNext])


  if (props.notifications && props.notifications[index]) {
    let item = props.notifications[index]
    let config = props.config.alerts.concat([props.config.emergency]).find(i => i.id === item.type)
    return (
      <Item 
        onPress={() => props.updateMapLocation(
          {
            latitude: item.coordinates.latitude,
            longitude: item.coordinates.longitude,
          }
        )} 
        style={{backgroundColor: item.backgroundColor}}
      >
        <Icon
          style={{ /* color: 'white', */ transform: [{ rotateY: '360deg' }, { scaleX: -1 }] }}
          type="AntDesign" name="notification"
        />
        <View style={{flex: 1, alignItems: 'flex-start'}} >
          <TextTicker 
            style={{ color: config.fontColor}}
            scrollSpeed={5000}
            bounceSpeed={5000}
          >
            {config.title} - {config.message }
          </TextTicker>
        </View>
        <Icon
          type={config.iconFont}
          name={config.iconName}
          style={{ fontSize: 25, color: config.iconColor}}
        />
      </Item>
    )
  } else {
    return (
      <Item>
        <Icon
          style={{ /* color: 'white', */ transform: [{ rotateY: '360deg' }, { scaleX: -1 }] }}
          type="AntDesign" name="notification"
        />
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TextTicker style={{ color: 'black' }} scrollSpeed={5000} bounceSpeed={5000} 
            onPress={() => props.navigation.navigate("Notifications")}
          >
            Hello! Today is a good day for sailing...
          </TextTicker>
        </View>
      </Item>
    )
  } 

}

const mapStateToProps = state => {
  return {
    config: state.home.config,
    notifications: state.notification.notificationsBar,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMapLocation: (location) => dispatch(mapActions.updateMapLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar)
