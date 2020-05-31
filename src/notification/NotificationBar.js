import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import TextTicker from 'react-native-text-ticker'
import { ListItem, Body, Right, Icon } from 'native-base'

import * as userActions from '../user/user.actions'
import * as notificationsActions from './notification.actions'
import notificationService from './notification.service'

class NotificationBar extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    nNotifications: 5,
    currentIndex: 0,
    flatListRef: null,
    notificationBarSlider: null,
  }

  componentDidMount() {
    this.props.getNotifications()
    this.state.notificationBarSlider = setInterval(this.scrollNext, 5000)
  }

  componentWillUnmount(){
    clearInterval(this.state.notificationBarSlider)
  }

  _renderItem = ({ item }) => { console.log(`item z BAR ${item.type} - ${item.id} `) 
    return (
    <ListItem avatar 
      onPress={() => this.props.updateLocation(notificationService.location(item))}
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

  scrollNext = () => {
    if (this.state.currentIndex < this.state.nNotifications - 1) {
      this.state.currentIndex += 1
    } else {
      this.state.currentIndex = 0
    }
    this.state.flatListRef?.scrollToIndex({
      index: this.state.currentIndex,
      animated: true,
    })
  }

  render () {
    if (this.props.showNotificationsLoader || !this.props.notifications[0]) {
      return (
        <TextTicker placeholder="Notifications" style={{ color: 'black' }}>
          Hello! Today is a good day for sailing... 
        </TextTicker>
      )
    } else {
      let data = this.props.notifications.slice(0, this.state.nNotifications)
      console.log(`BAR notfs ${data}`)
      return (
        <FlatList
          ref={ref => { this.state.flatListRef = ref}}
          pagingEnabled={false}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={this._renderItem}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    showNotificationsLoader: state.notification.showNotificationsLoader,
    notifications: state.notification.notifications,
    location: state.user.location,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: () => dispatch(notificationsActions.getNotifications()),
    updateLocation: (location) => dispatch(userActions.updateLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar)
