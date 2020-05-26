import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import TextTicker from 'react-native-text-ticker'
import { ListItem, Body, Right, Icon } from 'native-base'

import * as userActions from '../user/user.actions'
import * as notificationsActions from './notification.actions'
import NotificationService from './notification.service'

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

  _renderItem = ({ item }) => {
    let notificationService = new NotificationService(item)
    return (
      <ListItem avatar 
        onPress={() => this.props.updateLocation(notificationService.notification.location)}
        style={{ 
          paddingTop: 7, paddingLeft: 5, marginLeft: 0, marginRight: -8,
          backgroundColor: notificationService.type == 'emergency' ? '#d9534f' : 'white'
        }} >
        <Body style={{ paddingTop: 0, marginLeft: 0, borderBottomColor: 'transparent' }} >
          <TextTicker 
            style={{ marginLeft: 0, color: notificationService.fontColor() }}
            scrollSpeed={5000}
            bounceSpeed={5000}
          >
            {notificationService.title()} - {notificationService.message() }
          </TextTicker>
        </Body>
        <Right style={{ paddingTop: 0, marginLeft: 5, marginRight: 0, borderBottomColor: 'transparent' }}>
            <Icon
              type={notificationService.iconType()} 
              name={notificationService.iconName()} 
              style={{ fontSize: 25, color: notificationService.iconColor() }}
            />
        </Right>
      </ListItem>
    )
  }

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
    if (this.props.notifications[0]) {
      return (
        <FlatList
          ref={ref => { this.state.flatListRef = ref}}
          pagingEnabled={false}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={this.props.notifications.slice(0, this.state.nNotifications)}
          keyExtractor={(item)=>{return item.id}}
          renderItem={this._renderItem}
        />
      )
    } else {
      return (
        <TextTicker placeholder="Notifications"> Hello! Today is a good day for sailing... </TextTicker>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
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
