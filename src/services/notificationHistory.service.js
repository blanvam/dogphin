import geofirestoreServices from '../services/geofirestore.service'

const notificationsGeoFirestoreServices = geofirestoreServices("notificationsHistory")

export default {
  ...notificationsGeoFirestoreServices,
}
