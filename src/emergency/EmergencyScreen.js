import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions, Linking, Platform } from 'react-native'
import { Text, View, Button, Title, Toast, Icon } from 'native-base'
import Modal from 'react-native-modal'
import SwipeButton from 'rn-swipe-button'

import * as emergencyActions from './emergency.actions'
import * as notificationActions from '../notification/notification.actions'
import TextError from '../components/TextError'

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

  useEffect(() => {
    if (props.notificationCreated) {
      successEmergencyCreated()
    }
  }, [props.notificationCreated])

  //useEffect(() => {}, [props.showEmergencyModal])

  successEmergencyCreated = () => {
    if (props.notificationCreatedName == props.emergency.name) {
      props.toggleEmergencyModal(false)
      props.changeNotificationSuccess(false)
      setErrorMessage('')
    }
    Toast.show({
      text: `${props.notificationCreatedName} notification created!`,
      textStyle: { color: "white" },
      buttonText: "Okay",
      duration: 3000,
      position: "top"
    })
    props.changeNotificationName('')
    if (props.notificationCreatedName == props.emergency.name) {
      Linking.openURL(`tel:${props.emergency.phoneNumber}`)
    }
  }

  const cancelEmergencyCreation = () => {
    setErrorMessage('')
    props.toggleEmergencyModal(false)
  }

  createEmergencyPressed = () => {
    let alert = {
      name: props.emergency.name,
      type: props.emergency.id,
      follow: props.emergency.followable,
    }
    props.createEmergency(alert)
  }

  const emergencyIcon = () => (
    <Icon type={props.emergency.iconFont} name={props.emergency.iconName} style={{color: props.emergency.iconColor}} />
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
        <Title style={styles.title}> {props.i18n[props.emergency.title]} </Title>
        <Text>{props.i18n.sureOnCreateAlert}</Text>
        <SwipeButton
          railBackgroundColor='#C0C0C0'
          railFillBackgroundColor={props.emergency.backgroundColor}
          containerStyles={{marginTop: 30, backgroundColor: props.emergency.backgroundColor }} 
          thumbIconBackgroundColor={props.emergency.backgroundColor}
          title={props.i18n.swipe}
          titleColor={props.emergency.fontColor}
          width={'90%'} 
          thumbIconComponent={emergencyIcon}
          onSwipeStart={() => setErrorMessage('')}
          onSwipeFail={() => setErrorMessage(props.i18n.incompleteSwipe)}
          onSwipeSuccess={createEmergencyPressed}
        />
        <TextError error={errorMessage}/>
        <View style={styles.buttonContainer} >
          <Button bordered transparent
            title="Cancel" 
            onPress={cancelEmergencyCreation}
          >
            <Text>{props.i18n.cancel}</Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    emergency: state.home.config.emergency,
    showEmergencyModal: state.emergency.showEmergencyModal,
    notificationCreated: state.notification.notificationCreated,
    notificationCreatedName: state.notification.notificationCreatedName,
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
