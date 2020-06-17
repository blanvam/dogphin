import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions, FlatList } from 'react-native'
import { Text, View, Button, Icon, Title, Toast } from 'native-base'
import Modal from 'react-native-modal'

import * as alertActions from './alert.actions'
import * as notificationActions from '../notification/notification.actions'
import alerts from './alerts.json'
import CreateAlertScreen from './CreateAlertScreen'

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified'])

const alertElements = Object.values(alerts)
const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    marginTop: height/5,
    marginBottom: height/3, 
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
  listItemIcon: {
    fontSize: 35,
    width:35,
  },
})

const AlertScreen = props => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [modalAlert, setModalAlert] = useState({})

  successAlertCreated = () => {
    props.toggleModal(false)
      Toast.show({
        text: `${modalAlert.name} created!`,
        textStyle: { color: "white" },
        buttonText: "Okay",
        duration: 3000,
        position: "top"
      })
      props.createNotificationSuccess(false)
  }

  useEffect(() => {
    if (props.notificationCreated) {
      successAlertCreated()
    }
  }, [props.notificationCreated])

  useEffect(() => {}, [props.showModal, showCreateModal])

  renderItem = ({item}) => {
    return (
      <Button 
        transparent 
        onPress={() => { setShowCreateModal(true); setModalAlert(item) }}
        style={{flexDirection: 'column', marginBottom: 55, width: '50%'}}
      >
        <View
          style={{
            borderWidth: 2,
            borderColor: item.icon.color,
            alignItems:'center',
            justifyContent:'center',
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            borderRadius: 50,
          }}
        >
          <Icon
            style={{ color: item.icon.color, fontSize: 30 }}
            type={item.icon.font} 
            name={item.icon.name} 
          />
        </View>
        <Text style={{color: item.fontColor, fontSize: 12, marginTop: 5}}>{item.name}</Text>
      </Button>
    )
  }

  return(
    <Modal 
      style={styles.modal}
      animationIn='slideInDown'
      isVisible={props.showModal}
      onBackdropPress={() => props.toggleModal(false)}
      >
      <View style={styles.container}>
        <Title style={styles.title}>Send an Alerts</Title>
        <FlatList
          data={alertElements}
          numColumns={2}
          keyExtractor={(item) => item.id }
          renderItem={renderItem}
        />
        <Button bordered transparent
          title="Agree and Exit Dogphin" 
          onPress={() => props.toggleModal(false)}
          color="#CD5C5C"
          style={{marginBottom: 10}}
        >
          <Text>Cancel</Text>
        </Button>
      </View>
      < CreateAlertScreen 
        showModal={showCreateModal} 
        setShowModal={setShowCreateModal} 
        alert={modalAlert}
      />
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    notificationCreated: state.notification.notificationCreated,
    showModal: state.alert.showModal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectAlert: (alert) => dispatch(alertActions.selectAlert(alert)),
    toggleModal: (value) => dispatch(alertActions.toggleModal(value)),
    createNotificationSuccess: (value) => dispatch(notificationActions.createNotificationSuccess(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertScreen)
