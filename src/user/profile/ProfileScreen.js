import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { Container, Header, Content } from 'native-base'; 
import { Footer, FooterTab } from 'native-base';


export default class ProfileScreen extends Component {
    render () {
        return(
            <Container>
                <Header searchBar rounded>
                    <Text> Profile </Text>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Text> Profile... </Text>
                        <ActivityIndicator size='large'></ActivityIndicator>
                    </View>
                </Content>
                <Footer>
                    <FooterTab>
                        <Text> Profile... </Text>
                    </FooterTab>
                </Footer>
            </Container>
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
