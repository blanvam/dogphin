import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions, FlatList } from 'react-native'
import { Text, View, Button, Icon, Title } from 'native-base'
import Modal from 'react-native-modal'

import * as alertActions from './alert.actions'
import * as notificationActions from '../notification/notification.actions'
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
    fontSize: 11,
    marginTop: 5,
    textAlign: "center"
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
        <View style={{...styles.iconBorder, borderColor: item.iconColor}}>
          <Icon
            style={{ color: item.iconColor, fontSize: 30 }}
            type={item.iconFont} 
            name={item.iconName} 
          />
        </View>
        <Text style={{...styles.itemText, color: item.fontColor}}>{props.i18n[item.name]}</Text>
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
        <Title style={styles.title}>{props.i18n.createAlertTitle}</Title>
        <FlatList
          data={props.alerts}
          numColumns={2}
          keyExtractor={(item) => item.id }
          renderItem={renderItem}
        />
        <Button bordered transparent
          title="Aceptar y salir de Dogphin" 
          onPress={() => props.toggleAlertModal(false)}
        >
          <Text>{props.i18n.cancel}</Text>
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
    alerts: state.home.config.alerts,
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
