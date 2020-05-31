import React, { Component } from 'react';
import { connect } from 'react-redux';
import { YellowBox, ActivityIndicator, FlatList, StyleSheet } from "react-native"
import { Container, View, Text, Icon, Content, ListItem, Left, Body, Right } from 'native-base'

import * as notificationsActions from './notification.actions'
import notificationService from './notification.service'
import FooterBar from '../components/FooterBar'

//YellowBox.ignoreWarnings([
//	'VirtualizedLists should never be nested', // TODO: Remove when fixed
//])

class NotificationScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.getNotifications()
  }

  _renderItem = ({ item }) => { 
    console.log(`item SCREEN ${item.type} - ${item.id} `)
    return (
      <ListItem avatar>
        <Left>
          <Icon type={notificationService.iconType(item)} name={notificationService.iconName(item)} style={styles.listItemIcon} />
        </Left>
        <Body>
          <Text style={styles.listItemTitle}>{notificationService.title(item)}</Text>
          <Text note>{notificationService.message(item)}</Text>
        </Body>
        <Right>
          <Text note>{notificationService.timeAgo(item)}</Text>
        </Right>
      </ListItem>
    )
  }

  render () {
    if(this.props.showNotificationsLoader){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#00576a"/>
        </View>
      )
    }
    return(
      <Container>
        <FlatList
          data={this.props.notifications}
          keyExtractor={(item) => item.id }
          renderItem={this._renderItem}
        />
        <FooterBar active='Notifications' navigation={this.props.navigation} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  listItemIcon: {
    fontSize: 35,
    width:35,
  },
  listItemTitle:{
    fontSize:16,
    fontWeight: 'bold',
    color:"#1E90FF"
  }
})

const mapStateToProps = state => {
  return {
    showNotificationsLoader: state.notification.showNotificationsLoader,
    notifications: state.notification.notifications,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: () => dispatch(notificationsActions.getNotifications()),
    // toggleNotificationsLoader: status => dispatch(notificationsActions.toggleNotificationsLoader(status)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
