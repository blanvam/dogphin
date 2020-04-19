import db from '@react-native-firebase/firestore';


const listAlert = (querySnapshot)=>{
    let alerts = [];
    querySnapshot.forEach(function (doc, index) {
        // doc.data() is never undefined for query doc snapshots
        alerts.push(Object.assign({},{id: doc.id}, doc.data()));
    });
    return alerts;
};

class AlertService {

    constructor(alertId, data = {}){
        this.dbRef = db().collection("alerts").doc(alertId);
        this.id = alertId;
        this.data = data;
    }

    static collectionRef(){
        return db().collection("alerts");
    }

    collectionRef(){
        return AlertService.collectionRef();
    }

    //notify var is a function to manage errors or success messages to user
    static create(data, notify = () => {}){
        //data = JSON.parse(JSON.stringify(data));
        AlertService.collectionRef().add(data)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                notify("success", "Alert entry successfully created");
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                notify("error", "Error creating Alert entry: " + error);
            });
    }

    update(data, notify = ()=>{}){
        this.dbRef.update(data).then(function() {
            console.log("Alert entry successfully updated!");
            notify("success", "Alert entry successfully updated!")
        }).catch(function(error) {
            console.error("Error updating Alert entry: ", error);
            notify("error", "Error updating Alert entry: " + error)
        });
    }

    static all(action){
        AlertService.collectionRef().onSnapshot(function(querySnapshot) {
                action(listAlert(querySnapshot));
            }
        );
    }

    static where(action, ...query){
        AlertService.where(...query).onSnapshot(function(querySnapshot) {
                action(listAlert(querySnapshot));
            }
        );
    }

    static destroy_all(alertIds, notify = () => {}){
        let batch = db.batch();

        alertIds.forEach(alertId =>{
           batch.delete(AlertService.collectionRef().doc(alertId));
        });

        batch.commit().then(function() {
            console.log("Alert entry successfully deleted!");
            notify("success", "Alert entry successfully deleted!")
        }).catch(function(error) {
            console.error("Error removing alert entry: ", error);
            notify("error", "Error removing alert entry: " + error)
        });
    }
}

export default AlertService;
