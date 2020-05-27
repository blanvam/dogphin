import alertService from '../services/alert.service'


export default class NotificationService {

  constructor(notification){
    this.type = notification.type
    this.createdAt = notification.createdAt.toDate()
    this.notification = notification
  }

  static lasts = (onResult, onError) => { alertService.all(onResult, onError) }

  location () {
    return {
      latitude: this.notification.location.latitude,
      longitude: this.notification.location.longitude,
    }
  }

  timeAgo() {
    let secAgo = (new Date().getTime() - this.createdAt.getTime()) / 1000
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
      return this.createdAt.toDateString();
    }
  }

  iconType(){
    return typesConfig[this.type].icon.font
  }

  iconName(){
    return typesConfig[this.type].icon.name
  }

  iconColor(){
    return typesConfig[this.type].icon.color
  }

  fontColor(){
    return typesConfig[this.type].fontColor
  }

  message(){
    return typesConfig[this.type].message
  }

  title(){
    return typesConfig[this.type].title
  }
}

const typesConfig = Object.freeze({
  emergency: {
    icon: {
      font: "Octicons",
      name: "alert",
      color: "white",
    },
    fontColor: "white",
    title: "¡¡SOS!! ¡Emergencia!",
    message: "A 200m"
  },
  boat_damage: {
    icon: {
      font: "Octicons",
      name: "issue-opened",
      color: "orange"
    },
    fontColor: "black",
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
    title: "Mal tiempo/oleaje",
    message: "Parece que a 5Km hay oleaje o previsión de mal tiempo. ¡Tome precauciones!"
  },
  floating_object: {
    icon: {
      font: "FontAwesome",
      name: "warning",
      color: "orange", 
    },
    fontColor: "black",
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
    title: "¡SOS! Problemas de salud",
    message: "¡Alguien está teniendo problemas de salud! ¿Puedes ayudarle?"
  },
})
