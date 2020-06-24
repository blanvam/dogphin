import firestore from '@react-native-firebase/firestore'
import * as geofirestore from 'geofirestore'

const GeoFirestore = geofirestore.initializeApp(firestore())

export default (collection) => {
  const dbRef = GeoFirestore.collection(collection)
  return {
    geoCollectionRef: () => dbRef,
    add: (data, onSuccess, onError=(_ => {})) => (dbRef.add(data).then(onSuccess).catch(onError)),
    near: (location, radius, onSuccess, onError=(_ => {})) => {
      let center = new firestore.GeoPoint(location.latitude, location.longitude)
      return (dbRef.near({center: center, radius: radius}).get().then(onSuccess).catch(onError))
    }
  }
}