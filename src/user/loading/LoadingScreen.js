import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'


export default class LoadingScreen extends Component {
  constructor(props) {
    super(props)
    this.option1 = props.route.params.option1
    this.option2 = props.route.params.option2
    this.message = props.route.params.message
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? this.option1 : this.option2)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.message}</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})