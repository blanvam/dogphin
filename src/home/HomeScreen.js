import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { AppState, StyleSheet, Linking, Switch } from 'react-native'
import { Container, Header, Right, Content } from 'native-base'
import { Footer, FooterTab, Item } from 'native-base'
import { Icon, Button, Text, View, Badge } from 'native-base'
import auth from '@react-native-firebase/auth'

import { checkPermissions } from './permission/checkPermissions'
import ExitModal from './permission/ExitModal'
import Map from './map/Map'
import * as userActions from '../user/user.actions'
import userServices from '../user/user.services'


const defaultPostion = { latitude: 36.374665, longitude: -6.240144 }
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

  const [active, setActive] = useState(false)
  const [permissionsGranted, setPermissionsGranted] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [positionEnabled, setPositionEnabled] = useState(props.user?.positionEnabled || true)
  const [position, setPosition] = useState(props.user?.position || defaultPostion)
  const [zoom, setZoom] = useState(11)
  const [appState, setAppState] = useState(AppState.currentState)

  authStateChanged = (user) => {
    if (user) {
      userServices.get(
        user.email,
        usr => {
          if (usr) {
            setPositionEnabled(usr.positionEnabled)
            setPosition(usr.actualPosition)
            props.updateSuccess({email: user.email, ...usr})
          } else {
            props.updateSuccess(null)
          }
        }
      )
    } else {
      props.updateSuccess(null)
    }
  }

  handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active' && !permissionsGranted) {
      checkPermissions((r) => { setPermissionsGranted(r); setShowExitModal(!r) })
    }
    setAppState(nextAppState)
  }

  useEffect(() => { 
    AppState.addEventListener('change', handleAppStateChange)
    checkPermissions((r) => { setPermissionsGranted(r); setShowExitModal(!r) })
    const unlisten = auth().onAuthStateChanged(authStateChanged)
    return (() => {
      unlisten()
      AppState.removeEventListener('change', handleAppStateChange)
    })
  }, [])

  openURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  }

  updateUserPositionSwitch = (value) => {
    setPositionEnabled(value)
    userServices.update(
      props.user.email,
      {positionEnabled: value},
      () => { props.updateSuccess({positionEnabled: value, ...props.user}) }
    )
  }

  switchPosition = () => {
    if (props.user !== null) {
      return (
        <View style={styles.positionBar}>
          <Switch 
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={positionEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={updateUserPositionSwitch}
            value={positionEnabled}
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
           <Text placeholder="Notifications"> Hello! Today is a good day for sailing... </Text>
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
        <Map 
          markers={[
            {
              id: 1,
              latlng: {
                latitude: 36.374665,
                longitude: -6.240144,
              },
              title: "example marker",
              description: "example marker description"
            }
          ]}
          permissionsGranted={permissionsGranted} 
          latitude={position.latitude}
          longitude={position.longitude}
          onChange={(lat, long) => setPosition({ latitude: lat, longitude: long })}
        />
        <ExitModal modalVisible={showExitModal} />
      </Content>
      <Footer>
        <FooterTab>
          <Button active>
            <Icon type="MaterialIcons" name="explore" />
            <Text> Home </Text>
          </Button>
          <Button active onPress={() => openURL(`http://windy.com/?${position.longitude},${position.latitude},${zoom}`)}>
            <Icon type="MaterialCommunityIcons" name="weather-partlycloudy" />
            <Text>Weather</Text>
          </Button>
          <Button active badge vertical onPress={() => props.navigation.navigate("Notifications")} >
            <Badge ><Text>13</Text></Badge>
            <Icon type="MaterialCommunityIcons" name="bell-outline" />
            <Text>Notifications</Text>
          </Button>
        </FooterTab>
      </Footer>
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
    updateSuccess: (user) => dispatch(userActions.updateSuccess(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
