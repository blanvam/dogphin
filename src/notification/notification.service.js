import firestoreServices from '../services/firestore.service'

const notificationsFirestoreServices = firestoreServices("notifications")

export default {
  ...notificationsFirestoreServices,
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
  },
  updateQuery: (fieldPath, opStr, value, data) => {
    const updateNotification = (doc) => { notificationsFirestoreServices.update(doc.id, data, () => {}) }
    notificationsFirestoreServices.rawWhere(fieldPath, opStr, value, updateNotification)
    return true
  },
  location: (notification) => (
    {
      latitude: notification.location.latitude,
      longitude: notification.location.longitude,
    }
  ),
  iconType: (notification) => (
    typesConfig[notification.type].icon.font
  ),
  iconName: (notification) => (
    typesConfig[notification.type].icon.name
  ),
  iconColor: (notification) => (
    typesConfig[notification.type].icon.color
  ),
  backgroundColor: (notification) => (
    typesConfig[notification.type].backgroundColor
  ),
  fontColor: (notification) => (
    typesConfig[notification.type].fontColor
  ),
  message: (notification) => (
    typesConfig[notification.type].message
  ),
  title: (notification) => (
    typesConfig[notification.type].title
  )
}

const typesConfig = Object.freeze({
  emergency: {
    icon: {
      font: "MaterialCommunityIcons",
      name: "alert-decagram",
      color: "white",
    },
    fontColor: "white",
    backgroundColor: "#d9534f",
    title: "¡¡SOS!! ¡Emergencia!",
    message: "A 200m"
  },
  boat_damage: {
    icon: {
      font: "MaterialCommunityIcons",
      name: "alert-circle-outline",
      color: "orange"
    },
    fontColor: "black",
    backgroundColor: "white",
    title: "¡Barco dañado!",
    message: "¡A 1Km parece que alguien tiene el barco dañado! ¿Puedes ayudarle?"
  },
  fuel_empty: {
    icon: {
      font: "MaterialCommunityIcons",
      name: "fuel",
      color: "orange",
    },
    fontColor: "black",
    backgroundColor: "white",
    title: "Sin combustible",
    message: "A 200m hay alguien sin combustible, ponte en contacto si puedes ayudar."
  },
  bad_weather: {
    icon: {
      font: "MaterialCommunityIcons",
      name: "weather-lightning-rainy",
      color: "orange", 
    },
    fontColor: "black",
    backgroundColor: "white",
    title: "Mal tiempo/oleaje",
    message: "Parece que a 5Km hay oleaje o previsión de mal tiempo. ¡Tome precauciones!"
  },
  floating_object: {
    icon: {
      font: "MaterialCommunityIcons",
      name: "alert",
      color: "orange", 
    },
    fontColor: "black",
    backgroundColor: "white",
    title: "Objeto flotando/peligroso",
    message: "¡Tienes cerca un objeto flotante que podría ser peligroso!"
  },
  mechanic_failure: {
    icon: {
      font: "FontAwesome",
      name: "wrench",
      color: "orange", 
    },
    fontColor: "black",
    backgroundColor: "white",
    title: "Fallo de motor/eléctrico",
    message: "Cerca hay alguien con un fallo de motor o eléctrico"
  },
  health_sos: {
    icon: {
      font: "MaterialCommunityIcons",
      name: "heart-pulse",
      color: "#d9534f",
    },
    fontColor: "black",
    backgroundColor: "white",
    title: "¡SOS! Problemas de salud",
    message: "¡Alguien está teniendo problemas de salud! ¿Puedes ayudarle?"
  },
})
