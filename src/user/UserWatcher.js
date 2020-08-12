import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import userServices from './user.services'
import * as userActions from './user.actions'

const UserWatcher = props => {

  onUserCompleted = (uid, usr) => {
    props.updateUser({uid: uid, ...usr})
  }

  useEffect(() => {
    const unlisten = userServices.onAuthStateChanged(props.user, onUserCompleted)
    return unlisten
  }, [props.user.uid])
  
  return (<></>)
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

export default connect(mapStateToProps, mapDispatchToProps)(UserWatcher)