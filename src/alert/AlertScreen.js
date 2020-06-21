import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions, FlatList } from 'react-native'
import { Text, View, Button, Icon, Title } from 'native-base'
import Modal from 'react-native-modal'

import * as alertActions from './alert.actions'
import * as notificationActions from '../notification/notification.actions'
import alerts from './alerts.json'
import CreateAlertScreen from './CreateAlertScreen'


const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    width: '80%',
    marginLeft: '10%',
    marginTop: ((height-450)/2)*0.7,
    marginBottom: ((height-450)/2)*1.3,
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
  itemButton: {
    flexDirection: 'column', 
    marginBottom: 55, 
    width: '50%'
  },
  itemText: {
    fontSize: 12,
    marginTop: 5
  },
  iconBorder: {
    borderWidth: 2,
    alignItems:'center',
    justifyContent:'center',
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 50,
  }
})

const AlertScreen = props => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [modalAlert, setModalAlert] = useState({})

  useEffect(() => {
    if (props.notificationCreated) {
      successAlertCreated()
    }
  }, [props.notificationCreated])

  //useEffect(() => {}, [props.showModal, showCreateModal])

  const successAlertCreated = () => {
    props.toggleAlertModal(false)
    props.changeNotificationSuccess(false)
  }

  const buttonAlertPressed = (item) => {
    setShowCreateModal(true)
    setModalAlert(item)
  }

  createAlertPressed = () => {
    let newAlert = {
      location: props.location,
      name: modalAlert.name,
      type: modalAlert.id,
      follow: modalAlert.followable
    }
    props.createAlert(newAlert)
    setShowCreateModal(false)
  }

  renderItem = ({item}) => {
    return (
      <Button 
        transparent
        onPress={() => buttonAlertPressed(item)}
        style={styles.itemButton}
      >
        <View style={{...styles.iconBorder, borderColor: item.icon.color}}>
          <Icon
            style={{ color: item.icon.color, fontSize: 30 }}
            type={item.icon.font} 
            name={item.icon.name} 
          />
        </View>
        <Text style={{...styles.itemText, color: item.fontColor}}>{item.name}</Text>
      </Button>
    )
  }

  return(
    <Modal 
      style={styles.modal}
      animationIn='slideInDown'
      isVisible={props.showModal}
      deviceWidth={width}
      deviceHeight={height}
      onBackdropPress={() => props.toggleAlertModal(false)}
    >
      <View style={styles.container}>
        <Title style={styles.title}>Send an Alerts</Title>
        <FlatList
          data={alerts}
          numColumns={2}
          keyExtractor={(item) => item.id }
          renderItem={renderItem}
        />
        <Button bordered transparent
          title="Agree and Exit Dogphin" 
          onPress={() => props.toggleAlertModal(false)}
        >
          <Text>Cancel</Text>
        </Button>
      </View>
      < CreateAlertScreen 
        showModal={showCreateModal} 
        setShowModal={setShowCreateModal} 
        alert={modalAlert}
        createAlertPressed={createAlertPressed}
      />
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    location: state.user.location,
    showModal: state.alert.showModal,
    notificationCreated: state.notification.notificationCreated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleAlertModal: (value) => dispatch(alertActions.toggleModal(value)),
    createAlert: (params) => dispatch(notificationActions.createNotification(params)),
    changeNotificationSuccess: (value) => dispatch(notificationActions.changeNotificationSuccess(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertScreen)
