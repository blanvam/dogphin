import firestoreServices from '../services/firestore.service'

const notificationsFirestoreServices = firestoreServices("configuration")

export default {
  get: notificationsFirestoreServices.get,
}