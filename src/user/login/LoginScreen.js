import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, Dimensions, Alert } from 'react-native'
import { Container, Content, Form, Button, View, Text } from 'native-base'
import auth from '@react-native-firebase/auth'
import  { Path, Svg } from 'react-native-svg'
import FormItem from '../FormItem'

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
  loginForm: {
    width: '85%', 
    alignSelf: 'center',
  },
  loginError: {
    color: '#d9534f',
    marginTop: 20
  },
  loginButton: {
    marginTop: 50
  },
  loginText: {
    color: '#3740FE',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center'
  }
})
const { width, height } = Dimensions.get('window')
const shapes = {
  path: "M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z",
  width: 500,
  height: 150
}
const authErrors = {
  'auth/invalid-email': {
    'fields': ['email'],
    'message': 'The email address is badly formatted.'
  },
  'auth/user-disabled': {
    'fields': ['email'],
    'message': 'Account is disabled.'
  },
  'auth/user-not-found': {
    'fields': ['email', 'password'],
    'message': 'Incorrect email or password.'
  },
  'auth/wrong-password': {
    'fields': ['email', 'password'],
    'message': 'Incorrect email or password.'
  },
  'default': {
    'fields': ['email', 'password'],
    'message': 'Unable to access your account at this time, please try again later'
  } 
}
const TextError = props => {
  if (props.error) {
    return (<Text style={styles.loginError}>* {props.error}</Text>)
  }
  return null
}


export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      email: '', 
      password: '',
      isLoading: false,
      errorFields: [],
      errorMessage: ''
    }
  }

  userLogin = () => {
    if(this.state.email === '' || this.state.password === '') {
        Alert.alert('Enter details to signin!')
    } else {
        this.setState({errorFields: [], errorMessage: '', isLoading: true})
        auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res)
          console.log('User logged-in successfully!')
          this.setState({isLoading: false, email: '', password: ''})
          this.props.navigation.navigate('Profile')
        })
        .catch(error => {
          let e = (authErrors[error.code] || authErrors['default'])
          this.setState({ errorFields: e.fields, errorMessage: e.message, isLoading: false })
        })
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#00576a"/>
        </View>
      )
    }
    return (
      <Container>
        <Content>
          <View style={{height: '15%' }}>
            <Svg width={width+1} height={height*0.2} viewBox={`0 8 ${shapes.width} ${shapes.height}`}>
              <Path fill="#00576a" fillOpacity={1} d={shapes.path}></Path>
            </Svg>
          </View>
          <Form style={styles.loginForm}>
            <FormItem 
              error={this.state.errorFields.includes('email')}
              label='Username'
              value={this.state.email}
              onChangeText={(v) => this.setState({email: v})} 
            />
            <FormItem 
              error={this.state.errorFields.includes('password')}
              label='Password'
              value={this.state.password}
              onChangeText={(v) => this.setState({password: v})}
              secureTextEntry={true} 
            />
            <TextError error={this.state.errorMessage}/>
            <Button block style={styles.loginButton} onPress={() => this.userLogin()}>
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
