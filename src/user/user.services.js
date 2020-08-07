import auth from '@react-native-firebase/auth'

import firestoreServices from '../services/firestore.service'
import geofirestoreServices from '../services/geofirestore.service'

const usersFirestoreServices = firestoreServices("users")
const usersGeoFirestoreServices = geofirestoreServices("users")

export default {
  ...usersGeoFirestoreServices,
  currentUser: auth().currentUser || {},
  authSignOut: (onCompleted) => {
    auth().signOut().then(() => {
      auth().signInAnonymously().then(usr => {
        let userData = {locationEnabled: true, isAnonymous: true}
        usersFirestoreServices.set(usr.user.uid, userData, () => {})
        onCompleted({uid: usr.user.uid})
      })
    })
  },
  onAuthStateChanged: (currentUser, onCompleted) => (
    auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.uid !== currentUser.uid) {
          usersGeoFirestoreServices.get(user.uid, usr => onCompleted(user.uid, usr), () => onCompleted(user.uid, {}))
        }
      } else {
        auth().signInAnonymously().then(usr => {
          let userData = {locationEnabled: true, isAnonymous: true}
          usersFirestoreServices.set(usr.user.uid, userData, () => {})
          onCompleted(usr.user.uid, userData)
        }).catch(() => onCompleted(user.uid, {}))  
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
  ),
  forgotPassword: (email, onSuccess, onError) => (
    auth()
    .sendPasswordResetEmail(email)
    .then(onSuccess)
    .catch(onError)
  ),
  nearVisible: (center, radius, onResult, onError) => (
    usersGeoFirestoreServices.collectionRef()
    .where('locationEnabled', '==', true)
    .near({ center, radius})
    .onSnapshot(querySnapshot => onResult(usersGeoFirestoreServices.listElements(querySnapshot)), onError)
  )
}