import auth from '@react-native-firebase/auth'

import firestoreServices from '../services/firestore.service'

const locationsHistoryFirestoreServices = firestoreServices("locationsHistory")

export default { ...locationsHistoryFirestoreServices }