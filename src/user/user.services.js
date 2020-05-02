import firestore from '@react-native-firebase/firestore'

const dbRef = firestore().collection("users")
const listAlert = (querySnapshot) => {
  let alerts = []
  querySnapshot.forEach((doc, _) => {
    alerts.push({id: doc.id, ...doc.data()})
  })
  return alerts
}

export default {
  collectionRef: () => dbRef,
  all: (onResult, onError=(_ => {})) => (dbRef.onSnapshot(querySnapshot => onResult(listAlert(querySnapshot)), onError)),
  get: (id, onResult, onError=(_ => {})) => (dbRef.doc(id).onSnapshot(documentSnapshot => onResult(documentSnapshot.data() || {}), onError)),
  where: (query, onResult) => (dbRef.where(...query).get().then(querySnapshot => onResult(listAlert(querySnapshot)))),
  set: (id, data, onSuccess, onError=(_ => {})) => (dbRef.doc(id).set(data).then(docRef => onSuccess(docRef)).catch((error) => onError(error))),
  add: (data, onSuccess, onError=(_ => {})) => (dbRef.add(data).then(docRef => onSuccess(docRef)).catch((error) => onError(error))),
  update: (id, data, onSuccess, onError=(_ => {})) => (dbRef.doc(id).update(data).then(() => onSuccess()).catch((error) => onError(error)) ),
  destroy_all: (alertIds, notify) => {
    let batch = db.batch()
    alertIds.forEach(alertId =>{
      batch.delete(dbRef.doc(alertId))
    })
    batch.commit().then(function() {
      console.log("Alert entry successfully deleted!")
      notify("success", "Alert entry successfully deleted!")
    }).catch(function(error) {
      console.error("Error removing alert entry: ", error)
      notify("error", "Error removing alert entry: " + error)
    })
  }
}