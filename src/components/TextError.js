import React from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  error: {
    color: '#d9534f',
    marginTop: 20
  },
})

export default TextError = props => {
  if (props.error) {
    return (<Text style={styles.error}>* {props.error}</Text>)
  } else {
    return null
  }
}