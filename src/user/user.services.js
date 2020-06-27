import auth from '@react-native-firebase/auth'

//import firestoreServices from '../services/firestore.service'
import geofirestoreServices from '../services/geofirestore.service'

//const usersFirestoreServices = firestoreServices("users")
const usersGeoFirestoreServices = geofirestoreServices("users")

export default {
  ...usersGeoFirestoreServices,
  currentUser: auth().currentUser || {},
  onAuthStateChanged: (onSuccess, onError) => (
    auth().onAuthStateChanged((user) => {
      if (user) {
        usersGeoFirestoreServices.get(
          user.email,
          usr => onSuccess(user.email, usr),
          onError
        )
      } else { onError() }
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
    .then(() => { usersGeoFirestoreServices.set(email, userData, onSuccess, onError) })
    .catch(onError)
  )
}