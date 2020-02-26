import React, { Component } from 'react';
import {View, Text, StyleSheet } from "react-native"

export default class ProfileScreen extends Component {
    componentDidMount(){
        this.props.navigation.navigate("App")
    }
    render () {
        return(
            <View style={styles.container}>
                <Text> Profile Screen </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    }
)
