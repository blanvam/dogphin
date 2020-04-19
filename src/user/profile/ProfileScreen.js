import React, { Component } from 'react'
import {View, Text, StyleSheet, ActivityIndicator, Image, Alert } from "react-native"
import { Container, Content, Form, Button } from 'native-base'
import auth from '@react-native-firebase/auth'
import UserHeader from '../UserHeader'
import FormItem from '../FormItem'

const photo = 'http://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg?auto=compress&dpr=2&w=130'
// https://www.pexels.com/es-es/buscar/boat/
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    console.log(`profile props ${JSON.stringify(props)}`)
    this.state = {
      isLoading: true,
      email: props.email,
      phoneNumber: '',
      name: '',
      surname: '',
      portNumber: '',
      insuranceName: '',
      insurancePhoneNumber: '',
      insuranceIdNumber: '',
      contactPhoneNumber: '',
      errorFields: [],
      errorMessage: ''
    }
  }


  componentDidMount() {
    auth().onAuthStateChanged(user => {
      console.log(`USER Profile ${JSON.stringify(user)}`)
      if (user) {
        this.setState({
          email: user.email, phoneNumber: user.phoneNumber, 
          displayName: user.displayName, isLoading: false
        })
      } else {
        this.props.navigation.navigate('Login')
      }
    })
  }

  _userUpdate = () => {
    if(this.state.displayName == '' || this.state.surname == '' || this.state.portNumber == '' ||
       this.state.insuranceName == '' || this.state.insurancePhoneNumber == '' || 
       this.state.insuranceIdNumber == '' || this.state.contactPhoneNumber == '') {
      Alert.alert('Enter details to update profile info!')
    } else {
      this.setState({errorFields: [], errorMessage: '', isLoading: true})
      this.state.user.updateProfile({
        displayName: this.state.displayName,
      }).then((res) => { 
        console.log(`RES: ${res}`)
      }, function(error) {
        console.log(`error: ${error}`)
      })
    }
  }

  _renderLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large'></ActivityIndicator>
        </View>
      )
    } else {
      return null
    }
  }

  render () {
    return(
      <Container>
        <Content>
          <UserHeader height={150} style={{backgroundColor: 'transparent'}} />
          <Image style={styles.avatar} source={{uri: photo}}/>
          {this._renderLoading()}
          <Form style={styles.profileForm}>
            <FormItem 
              disabled={true}
              label='Email'
              value={this.state.email}
              placeholder='Disabled field'
              obligatory={true}
              keyboardType='email-address'
            />
            <FormItem 
              disabled={true}
              label='Phone Number'
              value={this.state.phoneNumber}
              placeholder='Disabled field'
              obligatory={true}
              keyboardType='number-pad'
            />
            <FormItem 
              error={this.state.errorFields.includes('displayName')}
              label='Name'
              value={this.state.displayName}
              onChangeText={(v) => this.setState({displayName: v})}
              obligatory={true}
            />
            <FormItem 
              error={this.state.errorFields.includes('surname')}
              label='Surname'
              value={this.state.surname}
              onChangeText={(v) => this.setState({surname: v})} 
            />
            <FormItem 
              error={this.state.errorFields.includes('portNumber')}
              label='Port phone number'
              value={this.state.portNumber}
              onChangeText={(v) => this.setState({portNumber: v})}
              keyboardType='number-pad'
            />
            <FormItem 
              error={this.state.errorFields.includes('insuranceName')}
              label='Insurance name'
              value={this.state.insuranceName}
              onChangeText={(v) => this.setState({insuranceName: v})} 
            />
            <FormItem 
              error={this.state.errorFields.includes('insurancePhoneNumber')}
              label='Insurance phone number'
              value={this.state.insurancePhoneNumber}
              onChangeText={(v) => this.setState({insurancePhoneNumber: v})}
              keyboardType='number-pad'
            />
            <FormItem 
              error={this.state.errorFields.includes('insuranceIdNumber')}
              label='Insurance id number'
              value={this.state.insuranceIdNumber}
              onChangeText={(v) => this.setState({insuranceIdNumber: v})} 
            />
            <FormItem 
              error={this.state.errorFields.includes('contactPhoneNumber')}
              label='Contact phone number'
              value={this.state.contactPhoneNumber}
              onChangeText={(v) => this.setState({contactPhoneNumber: v})}
              keyboardType='number-pad'
            />
            <Button warning block style={styles.profileButton} onPress={() => this._userUpdate()}>
              <Text> Update </Text>
            </Button>
          </Form>  
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop: 50
  },
  profileForm: {
    width: '85%', 
    alignSelf: 'center',
  },
  profileButton: {
    marginTop: 20,
    marginBottom: 20
  },
})
