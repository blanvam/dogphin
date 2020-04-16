import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { Container, Content, Form, Button, View, Text } from 'native-base'
import auth from '@react-native-firebase/auth'
import UserHeader from '../UserHeader'
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
const authErrors = {
  'auth/email-already-in-use': {
    'fields': ['email'],
    'message': 'Already exists an account with the given email address.'
  },
  'auth/invalid-email': {
    'fields': ['email'],
    'message': 'The email address is badly formatted.'
  },
  'auth/operation-not-allowed': {
    'fields': ['email', 'password'],
    'message': 'Unable to access your account at this time, please try again later'
  },
  'auth/weak-password': {
    'fields': ['password'],
    'message': 'Password is not strong enough. Should be at least 6 characters'
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


export default class SignupScreen extends Component {
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: 'dogphin.app@gmail.com', 
      password: 'password',
      phoneNumber: '',
      isLoading: false,
      errorFields: [],
      errorMessage: ''
    }
  }

  registerUser = () => {
    if(this.state.email === '' || this.state.password === '' || this.state.displayName === '' || this.state.phoneNumber === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({isLoading: true})
      auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({displayName: this.state.displayName, phoneNumber: this.state.phoneNumber})
        this.state.user.updateProfile({
          displayName: this.state.displayName,
          phoneNumber: this.state.phoneNumber
        }).then((res) => { 
          console.log(`OK: ${res}`)
        }, function(error) {
          console.log(`KO: ${error}`)
        })

        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => {
        let e = (authErrors[error.code] || authErrors['default'])
        console.log(`error --> ${error.message}`)
        this.setState({ errorFields: e.fields, errorMessage: e.message, isLoading: false })
      })
    }
  }

  render() {
    if(this.state.isLoading) {
      return(
      <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
      )
    }
    return (
      <Container>
        <Content>
          <UserHeader height={75} />
          <Form style={styles.loginForm}>
            <FormItem
              error={this.state.errorFields.includes('displayName')}
              label='Name'
              value={this.state.displayName}
              onChangeText={(v) => this.setState({displayName: v})}
              obligatory={true}
            />
            <FormItem 
              error={this.state.errorFields.includes('email')}
              label='Email'
              value={this.state.email}
              onChangeText={(v) => this.setState({email: v})} 
              obligatory={true}
            />
            <FormItem 
              error={this.state.errorFields.includes('phoneNumber')}
              label='Phone Number'
              value={this.state.phoneNumber}
              onChangeText={(v) => this.setState({phoneNumber: v})}
              obligatory={true}
            />
            <FormItem 
              error={this.state.errorFields.includes('password')}
              label='Password'
              value={this.state.password}
              onChangeText={(v) => this.setState({password: v})}
              obligatory={true}
              secureTextEntry={true} 
            />
            <TextError error={this.state.errorMessage}/>
            <Button block style={styles.loginButton} onPress={() => this.registerUser()}>
              <Text> Signup </Text>
            </Button>
            <Text style={styles.loginText}>Already Registered?</Text>
            <Button block warning bordered onPress={() => this.props.navigation.navigate('Login')}>
                <Text> Login </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
