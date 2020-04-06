import AlertService from './../services/AlertService'

class NotificationService {

  constructor(notification){
    this.type = notification.type
    this.createdAt = notification.createdAt.toDate()
    this.notification = notification
  }

  static lastNotifications(action){
    AlertService.all(action)
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
    return typesConfig[this.type].icon
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
    icon: "alert",
    title: "SOS!! Emergency!",
    message: "¡A 200m alguien ha enviado una llamada de socorro! ¿Puedes ayudarle?"
  },
  boat_damage: {
    icon: "issue-opened",
    title: "Boat damage",
    message: "¡A 1Km parece que alguien tiene el barco dañado! ¿Puedes ayudarle?"
  },
  fuel_empty: {
    icon: "issue-opened",
    title: "SOS!! Emergency!",
    message: "¡A 200m alguien ha enviado una llamada de socorro! ¿Puedes ayudarle?"
  },
  bad_weather: {
    icon: "issue-opened",
    title: "SOS!! Emergency!",
    message: "¡A 200m alguien ha enviado una llamada de socorro! ¿Puedes ayudarle?"
  },
  floating_object: {
    icon: "issue-opened",
    title: "SOS!! Emergency!",
    message: "¡A 200m alguien ha enviado una llamada de socorro! ¿Puedes ayudarle?"
  },
  mechanic_failure: {
    icon: "issue-opened",
    title: "SOS!! Emergency!",
    message: "¡A 200m alguien ha enviado una llamada de socorro! ¿Puedes ayudarle?"
  },
  health_sos: {
    icon: "issue-opened",
    title: "SOS!! Emergency!",
    message: "¡A 200m alguien ha enviado una llamada de socorro! ¿Puedes ayudarle?"
  },
})

export default NotificationService;
