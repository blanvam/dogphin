import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions, FlatList } from 'react-native'
import { Text, View, Button, Icon } from 'native-base'
import Modal from 'react-native-modal'

import * as alertActions from './alert.actions'
import alerts from './alerts.json'

const alertElements = Object.values(alerts)
const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    marginTop: height/5,
    marginBottom: height/3, 
    marginLeft: width/10, 
    marginRight: width/10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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

const AlertScren = props => {

  // useEffect(() => {
  //   return (() => {})
  // }, [showModal])

  useEffect(() => {
     return (() => {})
  }, [props.showModal])

  renderItem = ({item, index}) => {
    return (
      <Button iconLeft light>
        <Icon
          style={{
            marginTop: 5,
            fontWeight: 'bold',
            textAlign: 'center',
            color: item.icon.color }}
          type={item.icon.font} 
          name={item.icon.name} 
        />
        <Text>{item.name}</Text>
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
        <FlatList
          data={alertElements}
          numColumns={2}
          keyExtractor={(item) => item.id }
          renderItem={renderItem}
        />
        <Button rounded warning
          title="Agree and Exit Dogphin" 
          onPress={() => props.toggleModal(false)}
          color="#CD5C5C"
        >
          <Text>Cancel</Text>
        </Button>
      </View>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    showModal: state.alert.showModal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: (value) => dispatch(alertActions.toggleModal(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertScren)
