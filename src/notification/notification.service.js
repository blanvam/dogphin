import firestore from '@react-native-firebase/firestore'
import geofirestoreServices from '../services/geofirestore.service'
import notificationHistory from '../services/notificationHistory.service'

const notificationsGeoFirestoreServices = geofirestoreServices("notifications")

const raw = (querySnapshot, action) => {
  querySnapshot.forEach((doc, _) => { 
    action(doc) 
  })
}

export default {
  ...notificationsGeoFirestoreServices,
  updateLocationUserQuery: (email, coordinates) => {
    const timestamp = firestore.Timestamp.now()
    const updateNotification = (doc) => {
      if (timestamp >= doc.data().expiredAt) {
        const onSuccess = () => notificationsGeoFirestoreServices.delete(doc.id)
        notificationHistory.set(doc.id, doc.data(), onSuccess, onError)
      } else if (doc.data().follow) {
        notificationsGeoFirestoreServices.update(doc.id, {coordinates: coordinates}, () => {})
      }
    }
    notificationsGeoFirestoreServices.collectionRef()
      .where('user', '==', email)
      .get().then(querySnapshot => raw(querySnapshot, updateNotification))
  },
  timeAgo: (notification) => {
    let secAgo = (new Date().getTime() - notification.createdAt.toDate().getTime()) / 1000
    let minAgo, hoursAgo, daysAgo;
    if ((minAgo = secAgo/60) < 1) {
      return `${parseInt(secAgo)} seconds ago`;
    } else if ((hoursAgo = minAgo/60) < 1) {
      return `${parseInt(minAgo)} minutes ago`;
    } else if ((daysAgo = hoursAgo/24) < 1) {
      return `${parseInt(hoursAgo)} hours ago`;
    } else if ((daysAgo/30) < 1) {
      return `${parseInt(daysAgo)} days ago`;
    } else {
      return notification.createdAt.toDate().toDateString();
    }
  }
}
