import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native"
import { Container, Content, Form, Button } from 'native-base'

import UserHeader from '../UserHeader'
import FormItem from '../FormItem'
import * as userActions from '../user.actions'
import userServices from '../user.services'

const photo = 'http://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg?auto=compress&dpr=2&w=130'
// https://www.pexels.com/es-es/buscar/boat/

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
  updateError: {
    color: '#d9534f',
    marginTop: 20
  },
})

const TextError = props => {
  if (props.error) {
    return (<Text style={styles.updateError}>* {props.error}</Text>)
  } else {
    return null
  }
}

const Loader = props => {
  if (props.show) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large'></ActivityIndicator>
      </View>
    )
  } else {
    return null
  }
}

const ProfileScreen = props => {

  const [isLoading, setLoading] = useState(true)
  const [email, setEmail] = useState(props.user?.email)
  const [phoneNumber, setPhoneNumber] = useState(props.user?.phoneNumber)
  const [firstname, setFirstname] = useState(props.user?.firstname)
  const [surname, setSurname] = useState(props.user?.surname)
  const [portNumber, setPortNumber] = useState(props.user?.portNumber)
  const [insuranceName, setInsuranceName] = useState(props.user?.insuranceName)
  const [insurancePhoneNumber, setInsurancePhoneNumber] = useState(props.user?.insurancePhoneNumber)
  const [insuranceIdNumber, setInsuranceIdNumber] = useState(props.user?.insuranceIdNumber)
  const [contactPhoneNumber, setContactPhoneNumber] = useState(props.user?.contactPhoneNumber)
  const [errorFields, setErrorFields] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  onUserLoadSuccess = (email, usr) => {
    if (usr) {
      setPhoneNumber(usr.phoneNumber)
      setFirstname(usr.firstname)
      setSurname(usr.surname)
      setPortNumber(usr.portNumber)
      setInsuranceName(usr.insuranceName)
      setInsurancePhoneNumber(usr.insurancePhoneNumber)
      setInsuranceIdNumber(usr.insuranceIdNumber)
      setContactPhoneNumber(usr.contactPhoneNumber)
    }
    setEmail(email)
    props.updateUser({email: email, ...usr})
    setLoading(false)
  }

  onUserLoadFail = () => {
    props.updateUser({})
    props.navigation.navigate('Login')
    setLoading(false)
  }

  useEffect(() => {
    const unlisten = userServices.onAuthStateChanged(onUserLoadSuccess, onUserLoadFail)
    return unlisten
  }, [])

  updateProfileUser = () => {
    if(firstname == '') {
      setErrorFields(['firstname'])
      setErrorMessage('Name is obligatory!')
    } else {
      setErrorFields([])
      setErrorMessage('')
      setLoading(true)
      let userData = {
        firstname: firstname,
        surname: surname,
        portNumber: portNumber,
        insuranceName: insuranceName,
        insurancePhoneNumber: insurancePhoneNumber,
        insuranceIdNumber: insuranceIdNumber,
        contactPhoneNumber: contactPhoneNumber,
      }
      userServices.update(
        email,
        userData,
        () => {
          props.updateUser({email: email, phoneNumber: phoneNumber, ...userData})
          setLoading(false)
        },
        () => {
          setErrorFields([Object.keys(userData)])
          setErrorMessage('Unable to access your account at this time, please try again later')
          setLoading(false)
        }
      )
    }
  }

  return(
    <Container>
      <Content>
        <UserHeader height={150} style={{backgroundColor: 'transparent'}} />
        <Image style={styles.avatar} source={{uri: photo}}/>
        < Loader show={isLoading}/>
        <Form style={styles.profileForm}>
          <FormItem 
            disabled={true}
            label='Email'
            value={email}
            placeholder='Disabled field'
            obligatory={true}
          />
          <FormItem 
            disabled={true}
            label='Phone Number'
            value={phoneNumber}
            placeholder='Disabled field'
            obligatory={true}
          />
          <FormItem 
            error={errorFields.includes('firstname')}
            label='Name'
            value={firstname}
            onChangeText={(v) => setFirstname(v)}
            obligatory={true}
          />
          <FormItem 
            error={errorFields.includes('surname')}
            label='Surname'
            value={surname}
            onChangeText={(v) => setSurname(v)} 
          />
          <FormItem 
            error={errorFields.includes('portNumber')}
            label='Port phone number'
            value={portNumber}
            onChangeText={(v) => setPortNumber(v)}
            keyboardType='number-pad'
          />
          <FormItem 
            error={errorFields.includes('insuranceName')}
            label='Insurance name'
            value={insuranceName}
            onChangeText={(v) => setInsuranceName(v)} 
          />
          <FormItem 
            error={errorFields.includes('insurancePhoneNumber')}
            label='Insurance phone number'
            value={insurancePhoneNumber}
            onChangeText={(v) => setInsurancePhoneNumber(v)}
            keyboardType='number-pad'
          />
          <FormItem 
            error={errorFields.includes('insuranceIdNumber')}
            label='Insurance id number'
            value={insuranceIdNumber}
            onChangeText={(v) => setInsuranceIdNumber(v)} 
          />
          <FormItem 
            error={errorFields.includes('contactPhoneNumber')}
            label='Contact phone number'
            value={contactPhoneNumber}
            onChangeText={(v) => setContactPhoneNumber(v)}
            keyboardType='number-pad'
          />
          <TextError error={errorMessage}/>
          <Button warning block style={styles.profileButton} onPress={updateProfileUser}>
            <Text> Update </Text>
          </Button>
        </Form>  
      </Content>
    </Container>
  )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)