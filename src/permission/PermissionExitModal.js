import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, AppState, Dimensions, BackHandler, Linking } from 'react-native'
import { Text, View, Button } from 'react-native'
import Modal from 'react-native-modal'

import * as userActions from '../user/user.actions'
import { checkPermissions } from './permission/checkPermissions'

const {height, _} = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    marginTop: height/3,
    marginBottom: height/3, 
    marginLeft: 0, 
    marginRight: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  }
})

const PermissionExitModal = props => {

  const [showExitModal, setShowExitModal] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState)

  handleGranted = (value) => {
    props.updateUserPermissions(value)
    setShowExitModal(!value)
    return value
  }
   
  handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      checkPermissions(handleGranted)
    }
    setAppState(nextAppState)
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)
    checkPermissions(handleGranted)
    return (() => {
      AppState.removeEventListener('change', handleAppStateChange)
    })
  }, [props.permissionsGranted, showExitModal, appState])

  
  return(
    <Modal 
      style={styles.modal}
      isVisible={showExitModal}
      // backdropColor='white'
      // backdropOpacity='1'
      // deviceHeight={height}
      // deviceWidth={width/2}
      >
      <View style={styles.container}>
        <Text>Dogphin need location permission to run!</Text>
        <Text>Please give Dogphin permission and we will run correctly</Text>
        <Text></Text>
        <Button 
          title="Go to app settings" 
          onPress={() => { Linking.openSettings() }}
          color="#008000"
        />
        <Text></Text>
        <Button 
          title="Agree and Exit Dogphin" 
          onPress={() => { BackHandler.exitApp() }}
          color="#CD5C5C"
        />
      </View>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    permissionsGranted: state.user.permissions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserPermissions: (value) => dispatch(userActions.updatePermissions(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionExitModal)
