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
    if (props.description) { return <Text style={{marginBottom: 10}}> {props.description} </Text> }
  }

  if (props.phoneNumber) {
    return (
      <Callout style={{ width: props.title.length * 10, ...styles.container, ...props.style}} onPress={() => Linking.openURL(`tel:${props.phoneNumber}`)} >
        <Text style={styles.title}>{props.title}</Text>
        {getDescription()}
        <Text style={{color: 'blue'}} > Llamar </Text>
      </Callout>
    )
  } else {
    return (
      <Callout style={{ width: props.title.length * 10, ...styles.container, ...props.style}} >
        <Text style={styles.title}>{props.title}</Text>
        {getDescription()}
      </Callout>
    )
  }
}
