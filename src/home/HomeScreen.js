import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Switch } from 'react-native'
import { Container, Header, Right, Content } from 'native-base'
import { Icon, Button, Text, View, Item } from 'native-base'

import PermissionExitModal from '../permission/PermissionExitModal'
import FooterBar from '../components/FooterBar'
import Map from './map/Map'
import NotificationBar from '../notification/NotificationBar'
import * as userActions from '../user/user.actions'
import userServices from '../user/user.services'


const styles = StyleSheet.create({
  mapBar: {
    zIndex: 1,
    position: 'absolute',
    margin: 15,
  },
  alertBar: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  positionBar: {
    marginTop: 15,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  }
})

const HomeScreen = props => {
  const [locationEnabled, setLocationEnabled] = useState(props.user?.locationEnabled || true)

  onUserLoadSuccess = (email, usr) => {
    if (usr) {
      setLocationEnabled(usr.locationEnabled)
    }
    props.updateUser({email: email, ...usr})
  }

  onUserLoadFail = () => {
    props.updateUser({})
  }

  useEffect(() => {
    console.log(`AAAAAAAA locationEnabled: ${locationEnabled}`)
    const unlisten = userServices.onAuthStateChanged(onUserLoadSuccess, onUserLoadFail)
    return (unlisten)
  }, [locationEnabled])

  updateUserPositionSwitch = (value) => {
    setLocationEnabled(value)
    userServices.update(
      props.user.email,
      {locationEnabled: value},
      () => { props.updateUser({locationEnabled: value, ...props.user}) }
    )
  }

  switchPosition = () => {
    if (props.user?.email) {
      return (
        <View style={styles.positionBar}>
          <Switch 
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={locationEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={updateUserPositionSwitch}
            value={locationEnabled}
          />
        </View>
      )
    } else {
      return null
    }
  }

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon
            style={{ /*color: 'white',*/ transform: [{ rotateY: '360deg' }, { scaleX: -1 }] }}
            type="AntDesign" name="notification"
          />
          <NotificationBar />
        </Item>
        <Right style={{ flex: null }}>
          <Button transparent onPress={() => props.navigation.navigate('Profile')}>
            <Icon type="MaterialIcons" name="person" />
          </Button>
        </Right>
      </Header>
      <Content>
        <View style={styles.mapBar}>
          <View style={styles.alertBar}>
            <Button first rounded danger onPress={() => props.navigation.navigate('Alert')} >
              <Icon type="Octicons" name="alert" style={{ fontSize: 30, color: 'white' }} />
            </Button>
            <Button block rounded success style={{ width: '55%', marginLeft: 20, marginRight: 20 }} >
              <Text> Salida </Text>
            </Button>
            <Button last rounded light onPress={() => props.navigation.navigate('Alert')} >
              <Icon type="Octicons" name="issue-opened" style={{ fontSize: 30, color: 'orange' }} />
            </Button>
          </View>
          {switchPosition()}
        </View>
        <Map />
        <PermissionExitModal />
      </Content>
      <FooterBar active='Home' navigation={props.navigation} />
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => dispatch(userActions.update(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
