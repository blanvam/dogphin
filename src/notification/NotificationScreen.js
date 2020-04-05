import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from './notification.actions';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { Container, Header, Content } from 'native-base';
import { Footer, FooterTab } from 'native-base';
import NotificationService from './NotificationService'

function mapStateToProps(state) {
    return {
        notifications: state.notification.notifications,
    };
}

class NotificationScreen extends Component {

    componentDidMount(){
      NotificationService.all(this.props.actions.handleNotifications);
    }

    render () {
        return(
            <Container>
                <Content>
                  <ScrollView>
                    <View style={styles.container}>
                     { this.props.notifications.map(n => {
                        return (
                          <Text>{n.message}</Text>
                        )
                       })
                     }
                      <Text>prueba</Text>
                    </View>
                  </ScrollView>
                </Content>
                <Footer>
                    <FooterTab>
                        <Text> Notifications... </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
