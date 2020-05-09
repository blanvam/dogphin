
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Linking } from 'react-native'
import { Footer, FooterTab, Button, Icon, Text, Badge} from 'native-base'

const FooterBar = props => {

  const [zoom, _] = useState(11)

  openURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  }

  return(
    <Footer>
        <FooterTab>
          <Button active={props.active=="Home"} onPress={() => props.navigation.navigate("Home")} >
            <Icon type="MaterialIcons" name="explore" />
            <Text> Home </Text>
          </Button>
          <Button active={props.active=="Weather"} onPress={() => openURL(`http://windy.com/?${props.location.latitude},${props.location.longitude},${zoom}`)}>
            <Icon type="MaterialCommunityIcons" name="weather-partlycloudy" />
            <Text>Weather</Text>
          </Button>
          <Button active={props.active=="Notifications"} badge vertical onPress={() => props.navigation.navigate("Notifications")} >
            <Badge ><Text>13</Text></Badge>
            <Icon type="MaterialCommunityIcons" name="bell-outline" />
            <Text>Notifications</Text>
          </Button>
        </FooterTab>
      </Footer>
  )
}

const mapStateToProps = state => {
  return {
    location: state.user.location
  }
}

const mapDispatchToProps = _ => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterBar)