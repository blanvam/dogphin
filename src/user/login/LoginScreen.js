import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { Container, Content, Form, Button, View, Text } from 'native-base'

import UserHeader from '../../components/UserHeader'
import FormItem from '../../components/FormItem'
import RecoverPassword from '../../components/RecoverPassword'
import * as userActions from '../user.actions'
import userServices from '../user.services'

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
  'auth/invalid-email': {
    'fields': ['email'],
    'message': 'The email address is badly formatted.'
  },
  'auth/user-disabled': {
    'fields': ['email'],
    'message': 'Account is disabled.'
  },
  'auth/user-not-found': {
    'fields': ['email'],
    'message': 'Incorrect email.'
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


class LoginScreen extends Component {
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
      Alert.alert('¡Introduzca los datos para acceder!')
    } else {
      this.setState({errorFields: [], errorMessage: '', isLoading: true})
      userServices.signInWithEmail(
        this.state.email.trim(), 
        this.state.password,
        (res) => {
          this.setState({isLoading: false, email: '', password: ''})
          this.props.updateNewUser(res.user)
          this.props.navigation.navigate('Profile')
        },
        (error) => {
          let e = (authErrors[error.code] || authErrors['default'])
          this.setState({ errorFields: e.fields, errorMessage: e.message, isLoading: false })
        }
      )
    }
  }

  forgotPassword = (email) => {
    userServices.forgotPassword(
      email,
      () => { 
        this.setState({isLoading: false, email: '', password: ''})
        alert(`Por favor, revise su email...`)
      },
      (error) => {
        console.log(`Error ${error} - ${JSON.stringify(error)}`)
        let e = (authErrors[error.code] || authErrors['auth/user-not-found'])
        this.setState({ errorFields: e.fields, errorMessage: e.message, isLoading: false })
      }
    )
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
          <UserHeader height={75} />
          <Form style={styles.loginForm}>
            <FormItem 
              error={this.state.errorFields.includes('email')}
              label='Email'
              value={this.state.email}
              onChangeText={(v) => this.setState({email: v})} 
            />
            <FormItem 
              error={this.state.errorFields.includes('password')}
              label='Contraseña'
              value={this.state.password}
              onChangeText={(v) => this.setState({password: v})}
              secureTextEntry={true} 
            />
            <TextError error={this.state.errorMessage}/>
            <RecoverPassword onPress={() => this.forgotPassword(this.state.email)} />
            <Button block style={styles.loginButton} onPress={() => this.userLogin()}>
              <Text> Acceder </Text>
            </Button>
            <Text style={styles.loginText}>or</Text>
            <Button block warning bordered onPress={() => this.props.navigation.navigate('Signup')}>
                <Text> Registrarse </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = _ => {
  return { }
}

const mapDispatchToProps = dispatch => {
  return {
    updateNewUser: (user) => dispatch(userActions.updateNewUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)