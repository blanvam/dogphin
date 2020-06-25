import firestore from '@react-native-firebase/firestore'
import firestoreServices from '../services/firestore.service'
import geofirestoreServices from '../services/geofirestore.service'

const notificationsFirestoreServices = firestoreServices("notifications")
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
      console.log(`NOTIFICATION updateNotification ${doc.id} - ${doc.data().expiredAt}`)
      let data = { expired: timestamp >= doc.data().expiredAt }
      if (doc.data().follow) { data.coordinates = coordinates }
      notificationsGeoFirestoreServices.update(doc.id, data, () => {})
    }
    notificationsFirestoreServices.collectionRef()
      .where('user', '==', email)
      .where('expired', '==', false)
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
