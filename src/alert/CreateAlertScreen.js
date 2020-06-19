import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Text, View, Button, Title } from 'native-base'
import Modal from 'react-native-modal'


const { height, _ } = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    width: '80%',
    marginLeft: '10%',
    marginTop: ((height-280)/2)*0.7,
    marginBottom: ((height-280)/2)*1.3,
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
  },
  button: {
    margin: 10,
    width: '40%',
    justifyContent: 'center',
  }
})

export default CreateAlertScreen = props => {

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
            title="Cancel"
            onPress={() => props.setShowModal(false)}
            style={styles.button}
          >
            <Text>Cancel</Text>
          </Button>
          <Button bordered transparent
            title="Agree" 
            onPress={props.createAlertPressed}
            style={styles.button}
          >
            <Text>OK</Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}
