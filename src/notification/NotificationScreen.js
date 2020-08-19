import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { Container, View, Text, Icon, ListItem, Left, Body, Right, Button, Tab, Tabs } from 'native-base'

import FooterBar from '../components/FooterBar'
import notificationService from './notification.service'
import * as mapActions from '../map/map.actions'
import * as notificationActions from './notification.actions'


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
  },
  listItemInlineButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemButton: {
    height: 35,
    marginBottom: 0,
    paddingBottom: 0,
  },
  listItemIconButton: {
    fontSize: 30,
    width:30,
  },
})


const NotificationScreen = props => {

  useEffect(() => {}, [props.notifications, props.notificationSelectedId])

  moveToNotification = (item) => {
    props.selectNotificationId(item.id)
    props.updateMapLocation({latitude: item.coordinates.latitude, longitude: item.coordinates.longitude})
    props.markers[item.id].showCallout()
    props.navigation.navigate("Home")
  }

  renderItem = ({ item }) => {
    let config = props.config.alerts.concat([props.config.emergency]).find(i => i.id === item.type)
    return (
      <ListItem avatar selected={props.notificationSelectedId === item.id} >
        <Left>
          <Icon type={config.iconFont} name={config.iconName} style={styles.listItemIcon} />
        </Left>
        <Body>
          <Text style={styles.listItemTitle}>{props.i18n[config.title]}</Text>
          <Text note>{props.i18n[config.message]}</Text>
        </Body>
        <Right>
          <Text note>{notificationService.timeAgo(item.createdAt)}</Text>
          <Button transparent iconLeft style={styles.listItemButton} onPress={() => moveToNotification(item)}>
            <Icon type="MaterialIcons" name="my-location" style={{...styles.listItemIconButton, color: 'green'}} />
          </Button>
        </Right>
      </ListItem>
    )
  }

  renderMyItem = ({ item }) => {
    let config = props.config.alerts.concat([props.config.emergency]).find(i => i.id === item.type)
    return (
      <ListItem avatar selected={props.notificationSelectedId === item.id} >
        <Left>
          <Icon type={config.iconFont} name={config.iconName} style={styles.listItemIcon} />
        </Left>
        <Body style={{minHeight: 70}}>
          <Text style={styles.listItemTitle}>{props.i18n[config.title]}</Text>
          <Text note>{props.i18n[config.message]}</Text>
        </Body>
        <Right>
          <Text note>{notificationService.timeAgo(item.createdAt)}</Text>
          <View style={styles.listItemInlineButtons}>
            <Button transparent iconLeft style={styles.listItemButton} onPress={() => props.deleteNotification(item.id)}>
              <Icon type="FontAwesome" name="trash-o" style={{...styles.listItemIconButton, color: 'red'}} />
            </Button>
            <Button transparent iconLeft style={styles.listItemButton} onPress={() => moveToNotification(item)}>
              <Icon type="MaterialIcons" name="my-location" style={{...styles.listItemIconButton, color: 'green'}} />
            </Button>
          </View>
        </Right>
      </ListItem>
    )
  }

  showLoader = () => {
    if(props.showNotificationsLoader){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#00576a"/>
        </View>
      )
    }
  }

  return (
    <Container>
      {showLoader()}
      <Tabs>
        <Tab heading={props.i18n.general}>
            <FlatList
              data={props.notifications.filter(item => props.user.uid != item.user)}
              keyExtractor={(item) => item.id }
              renderItem={renderItem}
            />
        </Tab>
        <Tab heading={props.i18n.myAlerts}>
            <FlatList
              data={props.notifications.filter(item => props.user.uid == item.user)}
              keyExtractor={(item) => item.id }
              renderItem={renderMyItem}
            />
        </Tab>
      </Tabs>
      <FooterBar active='Notifications' navigation={props.navigation} />
    </Container>
  )

}

const mapStateToProps = state => {
  return {
    config: state.home.config,
    showNotificationsLoader: state.notification.showNotificationsLoader,
    notificationSelectedId: state.notification.notificationSelectedId,
    notifications: state.notification.notifications,
    markers: state.map.markers,
    user: state.user.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMapLocation: (location) => dispatch(mapActions.updateMapLocation(location)),
    selectNotificationId:  (id) => dispatch(notificationActions.selectNotificationId(id)),
    deleteNotification: (id) => dispatch(notificationActions.deleteNotification(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
