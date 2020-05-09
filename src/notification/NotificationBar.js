import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as notificationsActions from './notification.actions'
import NotificationService from './notification.service'
import TextTicker from 'react-native-text-ticker'

class NotificationBar extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.getNotifications()
  }

  render () {
    console.log(`Notifications ${this.props.notifications} - ${this.props.notifications[0]}`)
    if (this.props.notifications[0]) {
      console.log(`AAAAAA ${this.props.notifications[0]}`)
      let notificationService = new NotificationService(this.props.notifications[0])
      return (
      <TextTicker 
        // style={{ fontSize: 24 }}
        //duration={3000}
        scrollSpeed={3000}
        animationType={"scroll"}
        loop
        bounce
        repeatSpacer={10}
        //marqueeDelay={100}
      >
        {notificationService.title()} - {notificationService.message() }
      </TextTicker>
      )
    } else {
      console.log('bbbbb')
      return (
        <TextTicker placeholder="Notifications"> Hello! Today is a good day for sailing... </TextTicker>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notification.notifications,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: () => dispatch(notificationsActions.getNotifications()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar)
