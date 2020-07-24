import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Icon, Button, View, Toast } from 'native-base'

import * as alertActions from '../alert/alert.actions'
import * as emergencyActions from '../emergency/emergency.actions'
import LocationSwitch from './LocationSwitch'


const styles = StyleSheet.create({
  mapBar: {
    zIndex: 1,
    position: 'absolute',
    margin: 15,
  },
  alertBar: {
    alignSelf: 'center',
    flexDirection: 'row',
  }
})

const MapBar = props => {

  showErrorAndGoLogin = msg => {
    Toast.show({
      text: msg,
      //textStyle: { color: "red" },
      type: "warning",
      buttonText: "Vale",
      duration: 6000,
      position: "top"
    })
    props.navigation.navigate('Login')
  }

  showEmergencyModal = () => {
    if (props.user.email) {
      props.toggleEmergencyModal(true)
    } else {
      showErrorAndGoLogin('Debe logearse para crear una emergencia!') 
    }
  }

  showAlertModal = () => {
    if (props.user.email) {
      props.toggleAlertModal(true)
    } else {
      showErrorAndGoLogin('Debe logearse para crear una alerta!')
    }
  }

  return (
    <View style={styles.mapBar}>
      <View style={styles.alertBar}>
        <Button first rounded danger onPress={showEmergencyModal} >
          <Icon type="Octicons" name="alert" style={{ fontSize: 30, color: 'white' }} />
        </Button>
        <Button block rounded success style={{ width: '55%', marginLeft: 20, marginRight: 20 }} >
          <LocationSwitch />
        </Button>
        <Button last rounded onPress={showAlertModal} style={{backgroundColor: 'white'}}>
          <Icon type="Octicons" name="issue-opened" style={{ fontSize: 30, color: 'orange' }} />
        </Button>
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleAlertModal: (value) => dispatch(alertActions.toggleModal(value)),
    toggleEmergencyModal: (value) => dispatch(emergencyActions.toggleEmergencyModal(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapBar)