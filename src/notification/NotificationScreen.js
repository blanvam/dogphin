import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { Container, View, Text, Icon, ListItem, Left, Body, Right } from 'native-base'

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

  useEffect(() => {}, [props.notifications])

  renderItem = ({ item }) => {
    let config = props.config.alerts.concat([props.config.emergency]).find(i => i.id === item.type)
    return (
      <ListItem avatar>
        <Left>
          <Icon type={config.iconFont} name={config.iconName} style={styles.listItemIcon} />
        </Left>
        <Body>
          <Text style={styles.listItemTitle}>{config.title}</Text>
          <Text note>{config.message}</Text>
        </Body>
        <Right>
          <Text note>{config.timeAgo}</Text>
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
    config: state.home.config,
    showNotificationsLoader: state.notification.showNotificationsLoader,
    notifications: state.notification.notifications,
  }
}

const mapDispatchToProps = _ => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
