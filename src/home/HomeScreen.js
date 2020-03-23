import React, { Component } from 'react';
import { AppState, StyleSheet } from 'react-native';
import { Container, Header, Right, Content } from 'native-base';
import { Footer, FooterTab, Item } from 'native-base';
import { Icon, Button, Text, View, Badge } from 'native-base';

import { checkPermissions } from './permission/checkPermissions'
import ExitModal from './permission/ExitModal'

import Map from './map/Map'

const styles = StyleSheet.create({
  alertBar: {
    zIndex: 1,
    position: 'absolute',
    margin: 15,
    alignSelf: 'center',
    flexDirection: 'row',
  }
})

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
      permissionsGranted: true
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
    checkPermissions((r) => this.setState({ permissionsGranted: r }))
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active' && !this.state.permissionsGranted) {
      checkPermissions((r) => this.setState({ permissionsGranted: r }))
    }
    this.setState({appState: nextAppState})
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
          <View style={styles.alertBar}>
            <Button first rounded danger onPress={() => this.props.navigation.navigate('Alert')} >
              <Icon type="Octicons" name="alert" style={{ fontSize: 35, color: 'white' }} />
            </Button>
            <Button block rounded success style={{ width: '55%', marginLeft: 20, marginRight: 20 }} >
              <Text> Salida </Text>
            </Button>
            <Button last rounded light onPress={() => this.props.navigation.navigate('Alert')} >
              <Icon type="Octicons" name="issue-opened" style={{ fontSize: 40, color: 'orange' }} />
            </Button>
          </View>
          <Map />
          <ExitModal modalVisible={!this.state.permissionsGranted} />
        </Content>
        <Footer>
          <FooterTab>
            <Button active>
              <Icon type="MaterialIcons" name="explore" />
              <Text> Home </Text>
            </Button>
            <Button active>
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