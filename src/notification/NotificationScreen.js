import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from './notification.actions';
import { FlatList, View, Image, Text, StyleSheet, ActivityIndicator } from "react-native"
import { Container, Icon, Header, Content } from 'native-base';
import { Footer, FooterTab } from 'native-base';
import NotificationService from './NotificationService'

function mapStateToProps(state) {
    return {
        notifications: state.notification.notifications,
    };
}

class NotificationScreen extends Component {

    componentDidMount(){
      NotificationService.lastNotifications(this.props.actions.handleNotifications);
    }

    render () {
        return(
            <Container>
                <Content>
                  <FlatList styles={styles.root}
                    data={this.props.notifications}
                    ItemSeparatorComponent={() => {
                      return (
                        <View style={styles.separator}/>
                      )
                    }}
                    keyExtractor={(item)=>{
                      return item.id;
                    }}
                    renderItem={({item}) => {

                      let notificationService = new NotificationService(item)

                      return (
                      <View style={styles.container}>
                        <Icon type="Octicons" name={notificationService.iconType()} style={styles.avatar} />
                        <View styles={styles.content}>
                          <View>
                            <View style={styles.text}>
                              <Text style={styles.name}>{notificationService.title()}</Text>
                              <Text>{notificationService.message()}</Text>
                            </View>
                            <Text style={styles.timeAgo}>
                              {notificationService.timeAgo()}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}}
                  />
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
        root: {
          backgroundColor: "#FFFFFF"
        },
        container: {
          padding: 16,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: "#FFFFFF",
          alignItems: 'flex-start'
        },
        avatar: {
          width:50,
          height:50,
          borderRadius:25,
        },
        text: {
          marginBottom: 5,
          flexDirection: 'column',
          flexWrap:'wrap'
        },
        content: {
          flex: 1,
          marginLeft: 16,
          marginRight: 0
        },
        separator: {
          height: 1,
          backgroundColor: "#CCCCCC"
        },
        timeAgo:{
          fontSize:12,
          color:"#696969"
        },
        name:{
          fontSize:16,
          color:"#1E90FF"
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
