import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import TextTicker from 'react-native-text-ticker'
import { Item, Icon, Input, View, Text } from 'native-base'

import * as userActions from '../user/user.actions'
import * as notificationsActions from './notification.actions'
import notificationService from './notification.service'

const NotificationBar = props => {

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
    const timeot = setInterval(scrollNext.bind(this), 10000) 
    return () => clearInterval(timeot)
  }, [scrollNext])

  let ntf = props.notifications[index]
  if (ntf) {
    return (
      <Item 
        onPress={() => props.updateLocation(notificationService.location(ntf))} 
        style={{backgroundColor: notificationService.backgroundColor(ntf)}}
      >
        <Icon
          style={{ /* color: 'white', */ transform: [{ rotateY: '360deg' }, { scaleX: -1 }] }}
          type="AntDesign" name="notification"
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextTicker 
            style={{ color: notificationService.fontColor(ntf) }}
            scrollSpeed={5000}
            bounceSpeed={5000}
          >
            {notificationService.title(ntf)} - {notificationService.message(ntf) }
          </TextTicker>
        </View>
        <Icon
          type={notificationService.iconType(ntf)} 
          name={notificationService.iconName(ntf)} 
          style={{ fontSize: 25, color: notificationService.iconColor(ntf) }}
        />
      </Item>
    )
  }

  console.log(`aaaaaaaaaaa ${ntf}`)
  return (
    <Item>
      <Icon
        style={{ /* color: 'white', */ transform: [{ rotateY: '360deg' }, { scaleX: -1 }] }}
        type="AntDesign" name="notification"
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextTicker 
            style={{ color: notificationService.fontColor(ntf) }}
            scrollSpeed={5000}
            bounceSpeed={5000}
          >
            Hello! Today is a good day for sailing...
          </TextTicker>
        </View>
    </Item>
  )
 
}

const mapStateToProps = state => {
  return {
    notifications: state.notification.notificationsBar,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: (n) => dispatch(notificationsActions.getNotifications(n)),
    updateLocation: (location) => dispatch(userActions.updateLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar)
