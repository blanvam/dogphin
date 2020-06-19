import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import TextTicker from 'react-native-text-ticker'
import { Item, Icon, View } from 'native-base'

import * as mapActions from '../map/map.actions'
import * as notificationsActions from './notification.actions'
import notificationService from './notification.service'

const NotificationBar = props => {

  //const { notifications } = props.notifications
  const [numNotifications, _] = useState(5)
  const [index, setIndex] = useState(0)

  scrollNext = useCallback(async() => {
    let nextIndex = 0
    if (index < numNotifications - 1) {
      nextIndex = index + 1
    }
    setIndex(nextIndex)
  })

  useEffect(() => {
    props.getNotifications(numNotifications)
  }, [])

  useEffect(() => {
    const timeout = setInterval(scrollNext, 10000) 
    return () => clearInterval(timeout)
  }, [index, scrollNext])

  if (props.notifications && props.notifications[index]) {
    return (
      <Item 
        onPress={() => props.updateMapLocation(notificationService.location(props.notifications[index]))} 
        style={{backgroundColor: notificationService.backgroundColor(props.notifications[index])}}
      >
        <Icon
          style={{ /* color: 'white', */ transform: [{ rotateY: '360deg' }, { scaleX: -1 }] }}
          type="AntDesign" name="notification"
        />
        <View style={{flex: 1, alignItems: 'flex-start'}} >
          <TextTicker 
            style={{ color: notificationService.fontColor(props.notifications[index]) }}
            scrollSpeed={5000}
            bounceSpeed={5000}
          >
            {notificationService.title(props.notifications[index])} - {notificationService.message(props.notifications[index]) }
          </TextTicker>
        </View>
        <Icon
          type={notificationService.iconType(props.notifications[index])} 
          name={notificationService.iconName(props.notifications[index])} 
          style={{ fontSize: 25, color: notificationService.iconColor(props.notifications[index]) }}
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
          <TextTicker style={{ color: 'black' }} scrollSpeed={5000} bounceSpeed={5000} >
            Hello! Today is a good day for sailing...
          </TextTicker>
        </View>
      </Item>
    )
  } 

}

const mapStateToProps = state => {
  return {
    notifications: state.notification.notificationsBar,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: (n) => dispatch(notificationsActions.getNotifications(n)),
    updateMapLocation: (location) => dispatch(mapActions.updateMapLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar)
