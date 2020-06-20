import firestoreServices from '../services/firestore.service'

const notificationsFirestoreServices = firestoreServices("configurations")

export default {
  get: notificationsFirestoreServices.get,
}