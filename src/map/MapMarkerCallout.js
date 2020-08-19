import React from 'react'
import { StyleSheet, Linking } from 'react-native'
import { Text } from 'native-base'
import { Callout } from 'react-native-maps'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 6,
  },
  title: {
    marginTop: 10, 
    marginBottom: 5, 
    fontWeight: 'bold'
  }
})

export default MapMarkerCallout = props => {
  getDescription = () => {
    if (props.description) { return <Text style={{marginBottom: 10}}> {props.i18n[props.description]} </Text> }
  }

  if (props.callout) {
    return (
      <Callout style={{ width: props.i18n[props.title].length * 10, ...styles.container, ...props.style}} onPress={props.callout} >
        <Text style={styles.title}>{props.i18n[props.title]}</Text>
        {getDescription()}
        <Text style={{color: 'blue'}} > {props.i18n.call} </Text>
      </Callout>
    )
  } else {
    return (
      <Callout style={{ width: props.i18n[props.title].length * 10, ...styles.container, ...props.style}} >
        <Text style={styles.title}>{props.i18n[props.title]}</Text>
        {getDescription()}
      </Callout>
    )
  }
}
