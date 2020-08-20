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
    this.authErrors = {
      'auth/invalid-email': {
        'fields': ['email'],
        'message': props.i18n.emailBadlyFormatted
      },
      'auth/user-disabled': {
        'fields': ['email'],
        'message': props.i18n.accountDisabled
      },
      'auth/user-not-found': {
        'fields': ['email'],
        'message': props.i18n.incorrectEmail
      },
      'auth/wrong-password': {
        'fields': ['email', 'password'],
        'message': props.i18n.incorrectEmailPassword
      },
      'default': {
        'fields': ['email', 'password'],
        'message': props.i18n.unableAccessYourAccount
      }
    }
  }

  userLogin = () => {
    if(this.state.email === '' || this.state.password === '') {
      Alert.alert(this.props.i18n.loginDataRequired)
    } else {
      this.setState({errorFields: [], errorMessage: '', isLoading: true})
      userServices.signInWithEmail(
        this.state.email.trim(),
        this.state.password,
        (res) => {
          this.setState({isLoading: false, email: '', password: ''})
          this.props.updateUserNew(res.user)
          this.props.navigation.navigate('Home')
        },
        (error) => {
          let e = (this.authErrors[error.code] || this.authErrors['default'])
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
        alert(props.i18n.pleaseCheckEmail)
      },
      (error) => {
        let e = (this.authErrors[error.code] || this.authErrors['auth/user-not-found'])
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
              label={this.props.i18n.email}
              value={this.state.email}
              onChangeText={(v) => this.setState({email: v})} 
            />
            <FormItem 
              error={this.state.errorFields.includes('password')}
              label={this.props.i18n.password}
              value={this.state.password}
              onChangeText={(v) => this.setState({password: v})}
              secureTextEntry={true} 
            />
            <TextError error={this.state.errorMessage}/>
            <RecoverPassword 
              onPress={() => this.forgotPassword(this.state.email)} 
              textForgot={this.props.i18n.forgotPassword}
              textRecover={this.props.i18n.recoverPassword}
            />
            <Button block style={styles.loginButton} onPress={() => this.userLogin()}>
              <Text> {this.props.i18n.login} </Text>
            </Button>
            <Text style={styles.loginText}>or</Text>
            <Button block warning bordered onPress={() => this.props.navigation.navigate('Signup')}>
                <Text> {this.props.i18n.signup} </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return { 
    i18n: state.home.translations,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserNew: (user) => dispatch(userActions.updateNewUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)