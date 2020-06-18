import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { StyleSheet, Dimensions, Linking } from 'react-native'
import { Text, View, Button, Title, Toast, Icon } from 'native-base'
import Modal from 'react-native-modal'
import SwipeButton from 'rn-swipe-button'

import * as emergencyActions from './emergency.actions'
import * as notificationActions from '../notification/notification.actions'
import TextError from '../components/TextError'
import emergency from './emergency.json'

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified'])
YellowBox.ignoreWarnings(['AccessibilityInfo.fetch is deprecated'])

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    width: '80%',
    marginLeft: '10%',
    marginTop: ((height-350)/2)*0.7,
    marginBottom: ((height-350)/2)*1.3,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingBottom: 10
  },
  container: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',
    alignItems: 'center',
  },
  title: {
    margin: 15,
    color: 'black'
  },
  buttonContainer: {
    flex: 1,
    marginBottom: '2%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
})

const EmergencyScreen = props => {
  const [errorMessage, setErrorMessage] = useState('')
  const [alert, _] = useState({
    'user': props.user.email,
    'location': new firestore.GeoPoint(props.location.latitude, props.location.longitude),
    'createdAt': new firestore.FieldValue.serverTimestamp(),
    'type': emergency.id,
    'follow': emergency.followable,
    'name': emergency.name
  })

  successEmergencyCreated = () => {
    setErrorMessage('')
    props.toggleEmergencyModal(false)
    props.changeNotificationSuccess(false)
    Toast.show({
      text: `${props.notificationCreatedName} notification created!`,
      textStyle: { color: "white" },
      buttonText: "Okay",
      duration: 3000,
      position: "top"
    })
    props.changeNotificationName('')
  }

  cancelEmergencyCreation = () => {
    setErrorMessage('')
    props.toggleEmergencyModal(false)
  }

  useEffect(() => {
    if (props.notificationCreated) {
      successEmergencyCreated()
    }
  }, [props.notificationCreated])

  useEffect(() => {}, [props.showEmergencyModal])

  const emergencyIcon = () => (
    <Icon type={emergency.icon.font} name={emergency.icon.name} style={{color: emergency.icon.color}} />
  )

  return(
    <Modal 
      style={styles.modal}
      animationIn='slideInDown'
      isVisible={props.showEmergencyModal}
      deviceWidth={width}
      deviceHeight={height}
      onBackdropPress={cancelEmergencyCreation}
    >
      <View style={styles.container}>
        <Title style={styles.title}> {emergency.title} </Title>
        <Text>Are you sure you want to create this emergency?</Text>
        <SwipeButton
          railBackgroundColor='#C0C0C0'
          railFillBackgroundColor={emergency.backgroundColor}
          containerStyles={{marginTop: 30, backgroundColor: emergency.backgroundColor }} 
          thumbIconBackgroundColor={emergency.backgroundColor}
          title='Desliza!'
          titleColor={emergency.fontColor}
          width={'90%'} 
          thumbIconComponent={emergencyIcon}
          onSwipeStart={() => setErrorMessage('')}
          onSwipeFail={() => setErrorMessage('Incomplete swipe!')}
          onSwipeSuccess={() => {props.createEmergency(alert); Linking.openURL(`tel:${emergency.phoneNumber}`)}}
        />
        <TextError error={errorMessage}/>
        <View style={styles.buttonContainer} >
          <Button bordered transparent
            title="Cancel" 
            onPress={cancelEmergencyCreation}
          >
            <Text>Cancel</Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    location: state.user.location,
    notificationCreated: state.notification.notificationCreated,
    notificationCreatedName: state.notification.notificationCreatedName,
    showEmergencyModal: state.emergency.showEmergencyModal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleEmergencyModal: (value) => dispatch(emergencyActions.toggleEmergencyModal(value)),
    createEmergency: (params) => dispatch(notificationActions.createNotification(params)),
    changeNotificationSuccess: (value) => dispatch(notificationActions.changeNotificationSuccess(value)),
    changeNotificationName: (value) => dispatch(notificationActions.changeNotificationName(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyScreen)
