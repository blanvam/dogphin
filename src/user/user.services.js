import auth from '@react-native-firebase/auth'

import firestoreServices from '../services/firestore.service'

const usersFirestoreServices = firestoreServices("users")

export default {
  ...usersFirestoreServices,
  onAuthStateChanged: (onSuccess, onError) => (
    auth().onAuthStateChanged((user) => {
      if (user) {
        usersFirestoreServices.get(
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
    .then(() => { usersFirestoreServices.set(email, userData, onSuccess, onError) })
    .catch(onError)
  ),
  signInWithCredential: (credential, onSuccess, onError) => (
    auth()
    .signInWithCredential(credential)
    .then((result) => {
      let userData = { 
        "email": result.user.email,
        "phoneNumber": result.user.phoneNumber,
        "firstname": result.additionalUserInfo.profile.given_name || result.additionalUserInfo.profile.first_name,
        "surname": result.additionalUserInfo.profile.family_name || result.additionalUserInfo.profile.last_name,
      }
      usersFirestoreServices.set(userData.email, userData, onSuccess, onError)  
    }).catch(onError)
  ),
}