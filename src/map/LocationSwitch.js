import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Switch } from 'react-native'
import { Text, View } from 'native-base'

import userServices from '../user/user.services'
import * as userActions from '../user/user.actions'

const styles = StyleSheet.create({
  positionBar: {
    marginTop: 15,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  }
})

const LocationSwitch = props => {
  const [locationEnabled, setLocationEnabled] = useState(props.user.locationEnabled || true)

  onUserLoadSuccess = (uid, usr) => {
    if (usr) {
      setLocationEnabled(usr.locationEnabled)
    }
    props.updateUser({uid: uid, ...usr})
  }

  onUserLoadFail = (uid) => {
    props.updateUser({uid: uid})
  }

  useEffect(() => {
    const unlisten = userServices.onAuthStateChanged(props.user, onUserLoadSuccess, onUserLoadFail)
    return (unlisten)
  }, [locationEnabled, props.user.email])

  updateUserPositionSwitch = (value) => {
    setLocationEnabled(value)
    userServices.update(
      props.user.uid,
      {locationEnabled: value},
      () => { props.updateUser({locationEnabled: value, ...props.user}) }
    )
  }
  
  switchPosition = () => {
    if (props.user.email) {
      return (
        <>
          <Text> {locationEnabled ? "Visible" : "Invisible"} </Text>
          <View style={styles.positionBar}>
            <Switch 
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={locationEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={updateUserPositionSwitch}
              value={locationEnabled}
            />
          </View>
        </>
      )
    } else {
      return null
    }
  }

  return (
    <>
      {switchPosition()}
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => dispatch(userActions.update(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSwitch)