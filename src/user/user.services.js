import auth from '@react-native-firebase/auth'

import firestoreServices from '../services/firestore.service'
import geofirestoreServices from '../services/geofirestore.service'

const usersFirestoreServices = firestoreServices("users")
const usersGeoFirestoreServices = geofirestoreServices("users")

export default {
  ...usersGeoFirestoreServices,
  currentUser: auth().currentUser || {},
  onAuthStateChanged: (onSuccess, onError) => (
    auth().onAuthStateChanged((user) => {
      if (user) {
        usersGeoFirestoreServices.get(user.uid, usr => onSuccess(user.uid, usr), () => onError(user.uid))
      } else {
        auth().signInAnonymously().then(usr => {
          let userData = {locationEnabled: true, isAnonymous: true}
          usersFirestoreServices.set(usr.user.uid, userData, onSuccess, () => onError(user.uid))
          onSuccess(usr.user.uid, userData)
        }).catch(() => onError(user.uid))  
      }
    })
  ),
  signInWithEmail: (email, password, onSuccess, onError) => (
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(onSuccess)
    .catch(onError)
  ),
  signUp: (email, password, userData, onSuccess, onError) => (
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(r => { usersFirestoreServices.set(r.user.uid, userData, () => {onSuccess(r)}, onError) })
    .catch(onError)
  )
}