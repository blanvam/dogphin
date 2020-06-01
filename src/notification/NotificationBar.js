import React, { useState, useRef, useEffect, useCallback } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import TextTicker from 'react-native-text-ticker'
import { ListItem, Body, Right, Icon } from 'native-base'

import * as userActions from '../user/user.actions'
import * as notificationsActions from './notification.actions'
import notificationService from './notification.service'

const NotificationBar = props => {

  const [numNotifications, _] = useState(5)
  const flatListRef = useRef(null)
  const [index, setIndex] = useState(0)

  scrollNext = useCallback(async() => {
    let nextIndex = 0
    if (index < numNotifications - 1) {
      nextIndex = index + 1
    }
    flatListRef.current?.scrollToIndex({index: nextIndex, animated: true})
    console.log(`SSSSSSSSSSShould ${index} - ${numNotifications} go to next ${nextIndex}`)
    setIndex(nextIndex)
  })

  useEffect(() => {
    props.getNotifications(numNotifications)
  }, [])

  useEffect(() => {
    const timeot = setInterval(scrollNext.bind(this), 5000) 
    return () => clearInterval(timeot)
  }, [scrollNext])

  renderItem = ({ item }) => { 
    console.log(`item z BAR ${item.type} - ${item.id} `)
    return (
    <ListItem avatar 
      onPress={() => props.updateLocation(notificationService.location(item))}
      style={{ 
        paddingTop: 7, paddingLeft: 5, marginLeft: 0, marginRight: -8,
        backgroundColor: notificationService.backgroundColor(item)
      }} >
      <Body style={{ paddingTop: 0, marginLeft: 0, borderBottomColor: 'transparent' }} >
        <TextTicker 
          style={{ marginLeft: 0, color: notificationService.fontColor(item) }}
          scrollSpeed={5000}
          bounceSpeed={5000}
        >
          {notificationService.title(item)} - {notificationService.message(item) }
        </TextTicker>
      </Body>
      <Right style={{ paddingTop: 0, marginLeft: 5, marginRight: 0, borderBottomColor: 'transparent' }}>
          <Icon
            type={notificationService.iconType(item)} 
            name={notificationService.iconName(item)} 
            style={{ fontSize: 25, color: notificationService.iconColor(item) }}
          />
      </Right>
    </ListItem>
  )}

  return (
    <FlatList
      ref={flatListRef}
      pagingEnabled={false}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      data={props.notifications}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
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
