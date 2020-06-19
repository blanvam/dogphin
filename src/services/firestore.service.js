import firestore from '@react-native-firebase/firestore'

const listElements = (querySnapshot) => {
  let elements = []
  querySnapshot.forEach((doc, _) => {
    elements.push({id: doc.id, ...doc.data()})
  })
  return elements
}

const raw = (querySnapshot, action) => {
  querySnapshot.forEach((doc, _) => { action(doc) })
}

export default (collection) => {
  const dbRef = firestore().collection(collection)
  return {
    collectionRef: () => dbRef,
    all: (onResult, onError=(_ => {})) => (dbRef.onSnapshot(querySnapshot => onResult(listElements(querySnapshot)), onError)),
    get: (id, onResult, onError=(_ => {})) => (dbRef.doc(id).onSnapshot(documentSnapshot => onResult(documentSnapshot.data()), onError)),
    rawWhere: (fieldPath, opStr, value, action) => (dbRef.where(fieldPath, opStr, value).get().then(querySnapshot => raw(querySnapshot, action) )),
    where: (fieldPath, opStr, value, onResult) => (dbRef.where(fieldPath, opStr, value).get().then(querySnapshot => onResult(listElements(querySnapshot)))),
    set: (id, data, onSuccess, onError=(_ => {})) => (dbRef.doc(id).set(data).then(onSuccess).catch(onError)),
    add: (data, onSuccess, onError=(_ => {})) => (dbRef.add(data).then(onSuccess).catch(onError)),
    update: (id, data, onSuccess, onError=(_ => {})) => (dbRef.doc(id).update(data).then(onSuccess).catch(onError) ),
    destroy_all: (ids, notify) => {
      let batch = db.batch()
      ids.forEach(id =>{
        batch.delete(dbRef.doc(id))
      })
      batch.commit().then(function() {
        console.log(`${collection} entry successfully deleted!`)
        notify("success", `${collection} entry successfully deleted!`)
      }).catch(function(error) {
        console.error(`Error removing ${collection} entry: `, error)
        notify("error", `Error removing ${collection} entry: ` + error)
      })
    }
  }
}