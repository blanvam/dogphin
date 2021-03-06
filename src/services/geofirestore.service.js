import firestore from '@react-native-firebase/firestore'
import * as geofirestore from 'geofirestore'

const GeoFirestore = geofirestore.initializeApp(firestore())

const listElements = (querySnapshot) => {
  let elements = []
  querySnapshot.forEach((doc, _) => {
    elements.push({id: doc.id, ...doc.data()})
  })
  return elements
}

export default (collection) => {
  const dbRef = GeoFirestore.collection(collection)
  return {
    collectionRef: () => dbRef,
    all: (onResult, onError=(_ => {})) => 
      (dbRef.onSnapshot(querySnapshot => onResult(listElements(querySnapshot)), onError)),
    get: (id, onResult, onError=(_ => {})) => 
      (dbRef.doc(id).onSnapshot(documentSnapshot => onResult(documentSnapshot.data()), onError)),
    where: (fieldPath, opStr, value, onResult) => 
      (dbRef.where(fieldPath, opStr, value).get().then(querySnapshot => onResult(listElements(querySnapshot)))),
    set: (id, data, onSuccess, onError=(_ => {})) => {
      const timeStamp = new firestore.FieldValue.serverTimestamp()
      return dbRef.doc(id).set({createdAt: timeStamp, updatedAt: timeStamp, ...data}).then(onSuccess).catch(onError)
    },
    add: (data, onSuccess, onError=(_ => {})) => (dbRef.add(data).then(onSuccess).catch(onError)),
    update: (id, data, onSuccess, onError=(_ => {})) => {
      const timeStamp = new firestore.FieldValue.serverTimestamp()
      return dbRef.doc(id).update({updatedAt: timeStamp, ...data}).then(onSuccess).catch(onError) 
    },
    delete: (id, onSuccess=(_ => {}), onError=(_ => {})) => (dbRef.doc(id).delete().then(onSuccess).catch(onError) ),
    near: (center, radius, onResult, onError=(_ => {})) =>
      (dbRef.near({center, radius}).onSnapshot(querySnapshot => onResult(listElements(querySnapshot)), onError)),
    listElements: listElements,
  }
}