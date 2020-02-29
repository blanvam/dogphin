import React, { Component } from 'react';
import { Container, Header, Left, Right, Content } from 'native-base'; 
import { Footer, FooterTab, Item } from 'native-base';
import { Icon, Input, Button, Text } from 'native-base';

export default class HomeScreen extends Component {
    render () {
        return(
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                    <Right  style={{flex: null}}>
                        <Button transparent onPress={() => this.props.navigation.navigate('Recommended')}>
                        <Icon type="MaterialIcons" name="person" />
                        </Button>
                    </Right>
                </Header>
                <Content />
                <Footer>
                    <FooterTab>
                        <Button>
                            <Icon type="MaterialIcons" name="explore" />
                            <Text> Home </Text>
                        </Button>
                        <Button active>
                            <Icon type="MaterialCommunityIcons" name="weather-partlycloudy" />
                            <Text>Weather</Text>         
                        </Button>
                        <Button>
                        <Icon type="MaterialCommunityIcons" name="alert-circle" />
                            <Text>Notifications</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

