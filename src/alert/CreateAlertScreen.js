import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { StyleSheet, Dimensions } from 'react-native'
import { Text, View, Button, Title } from 'native-base'
import Modal from 'react-native-modal'

import * as notificationActions from '../notification/notification.actions'

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    marginTop: height/4,
    marginBottom: height/2, 
    marginLeft: width/10, 
    marginRight: width/10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  container: {
    width: '90%',
    marginLeft: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 15
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    margin: 10,
    width: '40%',
    justifyContent: 'center',
  }
})

const CreateAlertScreen = props => {

  const [alert, _] = useState({
    'user': props.user.email,
    'location': new firestore.GeoPoint(props.location.latitude, props.location.longitude),
    'createdAt': new firestore.FieldValue.serverTimestamp(),
  })

  useEffect(() => {}, [props.showModal, props.alert])

  createAlert = () => {
    let newAlert = {
      ...alert,
      'type': props.alert.id,
      'follow': props.alert.followable
    }
    props.createAlert(newAlert)
    props.setShowModal(false)
  }

  return(
    <Modal 
      style={styles.modal}
      animationIn='fadeIn'
      animationOut='fadeOut'
      isVisible={props.showModal}
      onBackdropPress={() => props.setShowModal(false)}
      >
      <View style={styles.container}>
        <Title style={styles.title}> {props.alert.title}</Title>
        <Text style={{marginTop: 10, marginBottom: 20}}>{props.alert.message}</Text>
        <Text>Are you sure you want to publish this?</Text>
        <View style={styles.buttonContainer}>
          <Button bordered transparent
            title="Agree and Exit Dogphin" 
            onPress={() => props.setShowModal(false)}
            color="#CD5C5C"
            style={styles.button}
          >
            <Text>Cancel</Text>
          </Button>
          <Button bordered transparent
            title="Agree and Exit Dogphin" 
            onPress={createAlert}
            color="#CD5C5C"
            style={styles.button}
          >
            <Text>OK</Text>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createAlert: (params) => dispatch(notificationActions.createNotification(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAlertScreen)
