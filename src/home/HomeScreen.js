import React, { Component } from 'react';
import { AppState, StyleSheet, Linking, Switch } from 'react-native';
import { Container, Header, Right, Content } from 'native-base';
import { Footer, FooterTab, Item } from 'native-base';
import { Icon, Button, Text, View, Badge } from 'native-base';

import { checkPermissions } from './permission/checkPermissions'
import ExitModal from './permission/ExitModal'
import Map from './map/Map'

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


export default class HomeScreen extends Component {
  constructor(props) {
      super(props)
      this.state = {
        active: false,
        appState: AppState.currentState,
        positionEnabled: true,
        permissionsGranted: false,
        showExitModal: false,
        user: null,
        latitude: 36.374665,
        longitude: -6.240144,
        zoom: 11
      };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
    checkPermissions((r) => this.setState({ permissionsGranted: r, showExitModal: !r }))
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active' && !this.state.permissionsGranted) {
      checkPermissions((r) => this.setState({ permissionsGranted: r, showExitModal: !r }))
    }
    this.setState({appState: nextAppState})
  }


  openURL(url) {
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

  render() {
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
            <Button transparent onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon type="MaterialIcons" name="person" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.mapBar}>
            <View style={styles.alertBar}>
              <Button first rounded danger onPress={() => this.props.navigation.navigate('Alert')} >
                <Icon type="Octicons" name="alert" style={{ fontSize: 30, color: 'white' }} />
              </Button>
              <Button block rounded success style={{ width: '55%', marginLeft: 20, marginRight: 20 }} >
                <Text> Salida </Text>
              </Button>
              <Button last rounded light onPress={() => this.props.navigation.navigate('Alert')} >
                <Icon type="Octicons" name="issue-opened" style={{ fontSize: 30, color: 'orange' }} />
              </Button>
            </View>
            <View style={styles.positionBar}>
              <Switch 
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.positionEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.setState({positionEnabled: !this.state.positionEnabled}) }
                value={this.state.positionEnabled}
              />
            </View>
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
            permissionsGranted={this.state.permissionsGranted} 
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            onChange={(lat, long) => this.setState({ latitude: lat, longitude: long })}
          />
          <ExitModal modalVisible={this.state.showExitModal} />
        </Content>
        <Footer>
          <FooterTab>
            <Button active>
              <Icon type="MaterialIcons" name="explore" />
              <Text> Home </Text>
            </Button>
            <Button active onPress={() => this.openURL(`http://windy.com/?${this.state.longitude},${this.state.latitude},${this.state.zoom}`)}>
              <Icon type="MaterialCommunityIcons" name="weather-partlycloudy" />
              <Text>Weather</Text>
            </Button>
            <Button active badge vertical onPress={() => this.props.navigation.navigate("Notifications")} >
              <Badge ><Text>13</Text></Badge>
              <Icon type="MaterialCommunityIcons" name="bell-outline" />
              <Text>Notifications</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
