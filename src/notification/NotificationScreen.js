import React from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { Container, View, Text, Icon, ListItem, Left, Body, Right } from 'native-base'

import notificationService from './notification.service'
import FooterBar from '../components/FooterBar'

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


const NotificationScreen = props => {
  renderItem = ({ item }) => { 
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

  showLoader = () => {
    if(props.showNotificationsLoader){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#00576a"/>
        </View>
      )
    }
  }

  return(
    <Container>
      {showLoader()}
      <FlatList
        data={props.notifications}
        keyExtractor={(item) => item.id }
        renderItem={renderItem}
      />
      <FooterBar active='Notifications' navigation={props.navigation} />
    </Container>
  )

}

const mapStateToProps = state => {
  return {
    showNotificationsLoader: state.notification.showNotificationsLoader,
    notifications: state.notification.notifications,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
