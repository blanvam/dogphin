import React, {Component} from 'react';

import { StyleSheet, Dimensions } from 'react-native'
import { BackHandler, Linking } from "react-native"
import { Text, View, Button } from "react-native"
import Modal from 'react-native-modal'

const {height, width} = Dimensions.get('window')
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


export default class ExitModal extends Component {
  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }

  render() {
    return(
      <Modal 
        style={styles.modal}
        isVisible={this.props.modalVisible}
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
}