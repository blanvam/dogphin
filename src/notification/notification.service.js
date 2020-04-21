import alertService from '../services/alert.service'


export default class NotificationService {

  constructor(notification){
    this.type = notification.type
    this.createdAt = notification.createdAt.toDate()
    this.notification = notification
  }

  static listAlert = (querySnapshot) => {
    let alerts = []
    querySnapshot.forEach((doc, _) => {
      alerts.push({id: doc.id, ...doc.data()})
    })
    return alerts
  }

  static lastNotifications = () => {
    return dispatch => {
      return alertService.all(
        (querySnapshot) => {
          let alerts = []
          querySnapshot.forEach((doc, _) => {
            alerts.push({id: doc.id, ...doc.data()})
          })
          dispatch(getNotificationsSuccess(alerts))
          dispatch(toggleNotificationsLoader(false))
          return alerts
        }
      )
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
    title: "¡¡SOS!! ¡Emergencia!",
    message: "¡A 200m alguien ha enviado una llamada de socorro! ¿Puedes ayudarle?"
  },
  boat_damage: {
    icon: "issue-opened",
    title: "¡Barco dañado!",
    message: "¡A 1Km parece que alguien tiene el barco dañado! ¿Puedes ayudarle?"
  },
  fuel_empty: {
    icon: "issue-opened",
    title: "Sin combustible",
    message: "A 200m hay alguien sin combustible, ponte en contacto si puedes ayudar."
  },
  bad_weather: {
    icon: "issue-opened",
    title: "Mal tiempo/oleaje",
    message: "Parece que a 5Km hay oleaje o previsión de mal tiempo. ¡Tome precauciones!"
  },
  floating_object: {
    icon: "issue-opened",
    title: "Objeto flotando/peligroso",
    message: "¡Tienes cerca un objeto flotante que podría ser peligroso!"
  },
  mechanic_failure: {
    icon: "issue-opened",
    title: "Fallo de motor/eléctrico",
    message: "Cerca hay alguien con un fallo de motor o eléctrico"
  },
  health_sos: {
    icon: "issue-opened",
    title: "¡SOS! Problemas de salud",
    message: "¡Alguien está teniendo problemas de salud! ¿Puedes ayudarle?"
  },
})
