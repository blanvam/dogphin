import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Platform } from 'react-native'
import { Container, Header, Right, Content } from 'native-base'
import { Icon, Button } from 'native-base'

import PermissionExitModal from '../permission/PermissionExitModal'
import EmergencyScreen from '../emergency/EmergencyScreen'
import AlertScreen from '../alert/AlertScreen'
import FooterBar from '../components/FooterBar'
//import Location from '../map/Location'
import MapBar from '../map/MapBar'
import Map from '../map/Map'
import NotificationBar from '../notification/NotificationBar'
import * as homeActions from '../home/home.actions'
import * as userActions from '../user/user.actions'
import userServices from '../user/user.services'

const HomeScreen = props => {

  useEffect(() => {
    props.updateUser({uid: userServices.currentUser.uid, email: userServices.currentUser.email})
    props.getConfiguration(Platform.OS)
  }, [])

  return (
    <Container>
      <Header searchBar rounded>
        <NotificationBar navigation={props.navigation} />
        <Right style={{ flex: null }}>
          <Button transparent onPress={() => props.navigation.navigate('Profile')}>
            <Icon type="MaterialIcons" name="person" />
          </Button>
        </Right>
      </Header>
      <Content>
        <MapBar />
        <Map />
        <PermissionExitModal />
        <EmergencyScreen />
        <AlertScreen />
      </Content>
      <FooterBar active='Home' navigation={props.navigation} />
    </Container>
  )
}

const mapStateToProps = _ => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    getConfiguration: (id) => dispatch(homeActions.getConfiguration(id)),
    updateUser: (user) => dispatch(userActions.update(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
