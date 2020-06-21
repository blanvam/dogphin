import firestore from '@react-native-firebase/firestore'
import firestoreServices from '../services/firestore.service'

const notificationsFirestoreServices = firestoreServices("notifications")

const raw = (querySnapshot, action) => {
  querySnapshot.forEach((doc, _) => { 
    action(doc) 
  })
}

export default {
  ...notificationsFirestoreServices,
  updateLocationUserQuery: (email, data) => {
    const timestamp = firestore.Timestamp.now()
    const updateNotification = (doc) => { notificationsFirestoreServices.update(doc.id, data, () => {}) }
    notificationsFirestoreServices.collectionRef()
      .where('user', '==', email)
      .where('follow', '==', true)
      .where('expiredAt', '>=', timestamp.toMillis())
      .get().then(querySnapshot => raw(querySnapshot, updateNotification) )},
  lasts: (onResult, onError) => { notificationsFirestoreServices.all(onResult, onError) },
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
