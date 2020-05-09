import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Container, Content, Form, Button, View, Text } from 'native-base'

import UserHeader from '../../components/UserHeader'
import FormItem from '../../components/FormItem'
import * as userActions from '../user.actions'
import userServices from '../user.services'

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


class SignupScreen extends Component {
  constructor() {
    super();
    this.state = { 
      firstname: 'Test 1',
      email: 'dogphin.app@gmail.com', 
      password: 'password',
      phoneNumber: '+34 622 34 34 34',
      isLoading: false,
      errorFields: [],
      errorMessage: ''
    }
  }

  _cleanedPhoneNumber = () => {
    return this.state.phoneNumber.replace(/(^\(?\+)?(\))?(\.)?(\-)?(\ )?/g, '')
  }

  _formFieldsValid = () => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //const phoneFormat = /^(\(?([+]?([0-9]{2}))\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/
    const phoneFormat = /^([0-9]{2})?([0-9]{9})$/
    let errorMessage = ''
    let errorFields = []
    if (emailFormat.test(this.state.email) === false) {
      errorFields.push('email')
      errorMessage += 'Introduce a correct email'
    }
    if (phoneFormat.test(this._cleanedPhoneNumber()) === false) {
      errorFields.push('phoneNumber')
      let msg = 'Introduce a correct phone number'
      errorMessage += errorMessage  ? `\n   ${msg}` : msg
    }
    if(this.state.password === ''){
      errorFields.push('password')
      let msg = 'Introduce password'
      errorMessage += errorMessage  ? `\n   ${msg}` : msg
    }
    if(this.state.firstname === '') {
      errorFields.push('firstname')
      let msg = 'Introduce your first name'
      errorMessage += errorMessage  ? `\n   ${msg}` : msg
    }
    if (errorFields.length === 0) {
      return true
    } else {
      this.setState({ errorFields: errorFields, errorMessage: errorMessage, isLoading: false })
      return false
    }
  }

  registerUser = () => {
    if (this._formFieldsValid()) {
      this.setState({errorFields: [], errorMessage: '', isLoading: true})
      let userData = {
        firstname: this.state.firstname, 
        phoneNumber: this.state.phoneNumber, 
        positionEnabled: true,
      }
      userServices.signUp(
        this.state.email,
        this.state.password,
        userData,
        () => {          
          this.props.updateUser({email: this.state.email, ...userData})
          this.setState({isLoading: false})
          this.props.navigation.navigate('Profile')
        },
        (error) => {
          let e = (authErrors[error.code] || authErrors['default'])
          this.setState({ errorFields: e.fields, errorMessage: e.message, isLoading: false })
        }
      )
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
              error={this.state.errorFields.includes('firstname')}
              label='Name'
              value={this.state.firstname}
              onChangeText={(v) => this.setState({firstname: v})}
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
              keyboardType='number-pad'
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)