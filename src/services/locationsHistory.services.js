import firestoreServices from '../services/firestore.service'

const locationsHistoryFirestoreServices = firestoreServices("locationsHistory")

export default { ...locationsHistoryFirestoreServices }