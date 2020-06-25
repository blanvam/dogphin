import geofirestoreServices from '../services/geofirestore.service'

const notificationsGeoFirestoreServices = geofirestoreServices("notificationsHistory")

export default {
  ...notificationsGeoFirestoreServices,
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
