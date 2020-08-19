import firestore from '@react-native-firebase/firestore'
import firestoreServices from '../services/firestore.service'
import geofirestoreServices from '../services/geofirestore.service'
import notificationHistory from '../services/notificationHistory.service'

const notificationsFirestoreServices = firestoreServices("notifications")
const notificationsGeoFirestoreServices = geofirestoreServices("notifications")

const raw = (querySnapshot, action) => {
  querySnapshot.forEach((doc, _) => {
    action(doc) 
  })
}

export default {
  ...notificationsGeoFirestoreServices,
  updateLocationUserQuery: (userId, coordinates) => {
    const timestamp = firestore.Timestamp.now().toMillis()
    const updateNotification = (doc) => {
      // TODO: Could be better do it in schedule firebase functions and here just update location.
      if (timestamp >= doc.data().expiredAt) {
        const onSuccess = () => { 
          notificationsGeoFirestoreServices.delete(doc.id)
        }
        notificationHistory.set(doc.id, doc.data(), onSuccess)
      } else if (doc.data().follow) {
        notificationsGeoFirestoreServices.update(doc.id, {coordinates: coordinates}, () => {})
      }
    }
    notificationsFirestoreServices.collectionRef()
      .where('user', '==', userId)
      .get().then(querySnapshot => raw(querySnapshot, updateNotification))
  }
}
