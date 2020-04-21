import firestore from '@react-native-firebase/firestore'


const dbRef = firestore().collection("alerts")
const listAlert = (querySnapshot) => {
  let alerts = [];
  querySnapshot.forEach((doc, index) => {
    // doc.data() is never undefined for query doc snapshots
    alerts.push(Object.assign({},{id: doc.id}, doc.data()));
  })
  return alerts;
}

export default {
  collectionRef: () => { return dbRef },
  all: (onResult, onError) => { return dbRef.onSnapshot(onResult, onError) },
  where: (action, ...query) => {
    dbRef.where(...query).onSnapshot((querySnapshot) => {
        action(listAlert(querySnapshot))
      }
    )
  },
  create: (data, notify) => {      
    dbRef.add(data)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
        notify("success", "Alert entry successfully created")
      })
      .catch((error) => {
        console.error("Error adding document: ", error)
        notify("error", "Error creating Alert entry: " + error)
      })
  },
  update: (data, notify) => {
    dbRef.update(data).then(() => {
      console.log("Alert entry successfully updated!")
      notify("success", "Alert entry successfully updated!")
    }).catch((error) => {
      console.error("Error updating Alert entry: ", error)
      notify("error", "Error updating Alert entry: " + error)
    })
  },
  destroy_all: (alertIds, notify) =>  {
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
