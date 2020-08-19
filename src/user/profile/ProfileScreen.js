import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native"
import { Container, Content, Form, Button } from 'native-base'

import UserHeader from '../../components/UserHeader'
import FormItem from '../../components/FormItem'
import TextError from '../../components/TextError'
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
})

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

  onUserLoadSuccess = (uid, usr) => {
    if (usr) {
      setEmail(usr.email)
      setPhoneNumber(usr.phoneNumber)
      setFirstname(usr.firstname)
      setSurname(usr.surname)
      setPortNumber(usr.portNumber)
      setInsuranceName(usr.insuranceName)
      setInsurancePhoneNumber(usr.insurancePhoneNumber)
      setInsuranceIdNumber(usr.insuranceIdNumber)
      setContactPhoneNumber(usr.contactPhoneNumber)
    }
    props.updateUser({uid: uid, ...usr})
    setLoading(false)
  }

  onUserLoadFail = (uid) => {
    props.updateUser({uid: uid})
    props.navigation.navigate('Login')
    setLoading(false)
  }

  useEffect(() => {
    if (props.user.email) {
      onUserLoadSuccess(props.user.uid, props.user)
    } else {
      onUserLoadFail(props.user.uid)
    }
  }, [props.user.email])

  updateProfileUser = () => {
    if(firstname == '') {
      setErrorFields(['firstname'])
      setErrorMessage(props.i18n.firstnameRequired)
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
        props.user.uid,
        userData,
        () => {
          props.updateUser({uid: props.user.uid, email: email, phoneNumber: phoneNumber, ...userData})
          setLoading(false)
        },
        () => {
          setErrorFields([Object.keys(userData)])
          setErrorMessage(props.i18n.unableAccessYourAccount)
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
        <Loader show={isLoading}/>
        <Form style={styles.profileForm}>
          <FormItem 
            disabled={true}
            label={props.i18n.email}
            value={email}
            placeholder='Disabled field'
            obligatory={true}
          />
          <FormItem 
            disabled={true}
            label={props.i18n.phone}
            value={phoneNumber}
            placeholder='Disabled field'
            obligatory={true}
          />
          <FormItem 
            error={errorFields.includes('firstname')}
            label={props.i18n.firstname}
            value={firstname}
            onChangeText={(v) => setFirstname(v)}
            obligatory={true}
          />
          <FormItem 
            error={errorFields.includes('surname')}
            label={props.i18n.surname}
            value={surname}
            onChangeText={(v) => setSurname(v)} 
          />
          <FormItem 
            error={errorFields.includes('portNumber')}
            label={props.i18n.portNumber}
            value={portNumber}
            onChangeText={(v) => setPortNumber(v)}
            keyboardType='number-pad'
          />
          <FormItem 
            error={errorFields.includes('insuranceName')}
            label={props.i18n.insuranceName}
            value={insuranceName}
            onChangeText={(v) => setInsuranceName(v)} 
          />
          <FormItem 
            error={errorFields.includes('insurancePhoneNumber')}
            label={props.i18n.insurancePhoneNumber}
            value={insurancePhoneNumber}
            onChangeText={(v) => setInsurancePhoneNumber(v)}
            keyboardType='number-pad'
          />
          <FormItem 
            error={errorFields.includes('insuranceIdNumber')}
            label={props.i18n.insuranceIdNumber}
            value={insuranceIdNumber}
            onChangeText={(v) => setInsuranceIdNumber(v)} 
          />
          <FormItem 
            error={errorFields.includes('contactPhoneNumber')}
            label={props.i18n.contactPhoneNumber}
            value={contactPhoneNumber}
            onChangeText={(v) => setContactPhoneNumber(v)}
            keyboardType='number-pad'
          />
          <TextError error={errorMessage}/>
          <Button warning block style={styles.profileButton} onPress={updateProfileUser}>
            <Text> {props.i18n.update} </Text>
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