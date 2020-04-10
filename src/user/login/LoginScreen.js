import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, Alert } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base'

import  { Path, Svg } from 'react-native-svg'

const shapes = {
  path: "M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z",
  width: 500,
  height: 150
}


import auth from '@react-native-firebase/auth'


export default class LoginScreen extends Component {
  constructor() {
    super()
    this.state = { 
        email: '', 
        password: '',
        isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state
    state[prop] = val
    this.setState(state)
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
        Alert.alert('Enter details to signin!')
    } else {
        this.setState({isLoading: true})
        auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res)
          console.log('User logged-in successfully!')
          this.setState({isLoading: false, email: '', password: ''})
          this.props.navigation.navigate('Dashboard')
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, isLoading: false })
          console.log("EEEE")
          console.log(error.message)
        })
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    const { width, height } = Dimensions.get("window")
    return (
      <Container>
        {/* <Header /> */}
        <Content>
          <View style={{height: 50, backgroundColor: "#00576a" }}/>
          <Svg width={width+1} height={height*0.2} viewBox={`0 8 ${shapes.width} ${shapes.height}`}>
            <Path fill="#00576a" fillOpacity={1} d={shapes.path}></Path>
          </Svg>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input
                value={this.state.email}
                onChangeText={(val) => this.updateInputVal(val, 'email')} 
              />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input 
                value={this.state.password}
                onChangeText={(val) => this.updateInputVal(val, 'password')}
                secureTextEntry={true} 
              />
            </Item>
            <Button block onPress={() => this.userLogin()}>
              <Text> Login </Text>
            </Button>
            <Text style={styles.loginText}>or</Text>
            <Button block warning bordered onPress={() => this.props.navigation.navigate('Signup')}>
                <Text> Signup </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  loginText: {
    color: '#3740FE',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center'
  },
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
  signup: {
    marginTop: 30,
    alignSelf: 'center',
    textAlign: 'center'
  }
})