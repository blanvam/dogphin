import React, { useState } from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Text, View, Button } from 'native-base'
import Modal from 'react-native-modal'
import * as RNLocalize from 'react-native-localize'
import translations from '../../home/translations.json'
import PrivacySpanish from './PrivacySpanish'
import PrivacyFrench from './PrivacyFrench'

const usedLanguages = RNLocalize.getLocales()

let allLanguages = Object.keys(translations)
let languages = usedLanguages.map(e => e.languageCode)
let lenguage = languages.filter(e => allLanguages.includes(e))[0] || 'en'
let i18n = (translations[lenguage]).translation

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    width: '96%',
    marginLeft: '2%',
    marginTop: '10%',
    marginBottom: '10%',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingTop: 25,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',
    alignItems: 'center',
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: (height * 0.7) - 30
  },
  title: {
    fontSize: 22,
    alignSelf: 'center'
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcP:{
    marginTop: 10,
    fontSize: 12
  },
  tcL:{
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcT:{
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    marginBottom: '2%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
})

let privacy;
if(lenguage == 'fr'){
  privacy = <PrivacyFrench />
}else{
  privacy = <PrivacySpanish />
}

export default PrivacyModal = props => {

  return (
    <Modal 
      style={styles.modal}
      animationIn='slideInDown'
      isVisible={props.showModal}
      deviceWidth={width}
      deviceHeight={height}
      onBackdropPress={() => props.toggleModal()}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.privacyPolicyTitle}</Text>
          {privacy}
        <View style={styles.buttonContainer} >
          <Button bordered transparent
            title="Ok" 
            onPress={() => props.toggleModal()}
          >
            <Text> {i18n.read} </Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}
