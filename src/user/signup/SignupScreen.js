import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Container, Content, Form, Button, View, Text } from 'native-base'
import { ListItem, CheckBox, Body } from 'native-base'

import UserHeader from '../../components/UserHeader'
import FormItem from '../../components/FormItem'
import PrivacyModal from './PrivacyModal'
import * as userActions from '../user.actions'
import userServices from '../user.services'

const TextError = props => {
  if (props.error) {
    return (<Text style={styles.loginError}>* {props.error}</Text>)
  }
  return null
}


class SignupScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      firstname: '',
      email: '', 
      password: '',
      phoneNumber: '',
      isLoading: false,
      errorFields: [],
      errorMessage: '',
      privacyPolicy: false,
      showPolicyModal: false,
    }
    this.authErrors = {
      'auth/email-already-in-use': {
        'fields': ['email'],
        'message': props.i18n.alreadyInUse
      },
      'auth/invalid-email': {
        'fields': ['email'],
        'message': props.i18n.emailBadlyFormatted
      },
      'auth/operation-not-allowed': {
        'fields': ['email', 'password'],
        'message': props.i18n.operationNotAllowed
      },
      'auth/weak-password': {
        'fields': ['password'],
        'message': props.i18n.weakPassword
      },
      'default': {
        'fields': ['email', 'password'],
        'message': props.i18n.unableAccessYourAccount
      } 
    }
  }

  _cleanedPhoneNumber = () => {
    return this.state.phoneNumber.replace(/(^\(?\+)?(\))?(\.)?(\-)?(\ )?/g, '')
  }

  _formFieldsValid = () => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //const phoneFormat = /^(\(?([+]?([0-9]{2}))\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/
    // const phoneFormat = /^([0-9]{2})?([0-9]{9})$/
    const phoneFormat = /^([0-9]*)$/
    let errorMessage = ''
    let errorFields = []
    if (emailFormat.test(this.state.email) === false) {
      errorFields.push('email')
      errorMessage += 'Introduce un email válido'
    }
    if (phoneFormat.test(this._cleanedPhoneNumber()) === false) {
      errorFields.push('phoneNumber')
      let msg = 'Introduce un teléfono válido'
      errorMessage += errorMessage  ? `\n   ${msg}` : msg
    }
    if(this.state.password === ''){
      errorFields.push('password')
      let msg = 'Introduce una contraseña'
      errorMessage += errorMessage  ? `\n   ${msg}` : msg
    }
    if(this.state.firstname === '') {
      errorFields.push('firstname')
      let msg = 'Introduce tu nombre'
      errorMessage += errorMessage  ? `\n   ${msg}` : msg
    }
    if(!this.state.privacyPolicy) {
      errorFields.push('privacyPolicy')
      let msg = 'Debe aceptar la política de privacidad'
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
        email: this.state.email,
        firstname: this.state.firstname, 
        phoneNumber: this.state.phoneNumber, 
        locationEnabled: true,
        active: true,
      }
      userServices.signUp(
        this.state.email,
        this.state.password,
        userData,
        result => {
          this.props.updateUserNew({uid: result.user.uid, ...userData})
          this.setState({isLoading: false})
          this.props.navigation.navigate('Home')
        },
        (error) => {
          let e = (this.authErrors[error.code] || this.authErrors['default'])
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
              label={this.props.i18n.firstname}
              value={this.state.firstname}
              onChangeText={(v) => this.setState({firstname: v})}
              obligatory={true}
            />
            <FormItem 
              error={this.state.errorFields.includes('email')}
              label={this.props.i18n.email}
              value={this.state.email}
              onChangeText={(v) => this.setState({email: v})} 
              obligatory={true}
            />
            <FormItem 
              error={this.state.errorFields.includes('phoneNumber')}
              label={this.props.i18n.phone}
              value={this.state.phoneNumber}
              onChangeText={(v) => this.setState({phoneNumber: v})}
              obligatory={true}
              keyboardType='number-pad'
            />
            <FormItem 
              error={this.state.errorFields.includes('password')}
              label={this.props.i18n.password}
              value={this.state.password}
              onChangeText={(v) => this.setState({password: v})}
              obligatory={true}
              secureTextEntry={true} 
            />
            <TextError error={this.state.errorMessage}/>
            <ListItem style={{borderBottomWidth: 0, minHeight: 100}}>
              <CheckBox 
                checked={this.state.privacyPolicy}
                onPress={() => this.setState({privacyPolicy: !this.state.privacyPolicy})} 
              />
              <Body style={{flexDirection:'row', flexWrap:'wrap'}}>
                <Text style={{marginRight: 0}}>{this.props.i18n.accept} </Text>
                <Text style={{marginLeft: 0, color: 'blue'}} onPress={() => this.setState({showPolicyModal: true})}>{this.props.i18n.privacyPolicy}</Text>
              </Body>
            </ListItem>
            <Button block style={styles.loginButton} onPress={() => this.registerUser()}>
              <Text>{this.props.i18n.signup}</Text>
            </Button>
            <Text style={styles.loginText}>{this.props.i18n.alreadyRegistered}</Text>
            <Button block warning bordered onPress={() => this.props.navigation.navigate('Login')}>
                <Text>{this.props.i18n.login}</Text>
            </Button>
          </Form>
          <PrivacyModal showModal={this.state.showPolicyModal} toggleModal={() => this.setState({showPolicyModal: false})}/>
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
    i18n: state.home.translations,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserNew: (user) => dispatch(userActions.updateNewUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)