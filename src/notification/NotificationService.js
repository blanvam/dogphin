import db from '@react-native-firebase/firestore';


const listNotification = (querySnapshot)=>{
    let notifications = [];
    querySnapshot.forEach(function (doc, index) {
        // doc.data() is never undefined for query doc snapshots
        notifications.push(Object.assign({},{fid: doc.id}, doc.data()));
    });
    return notifications;
};

class NotificationService {

    constructor(notificationId, data = {}){
        this.dbRef = db().collection("notifications").doc(notificationId);
        this.notificationId = notificationId;
        this.data = data;
    }

    static collectionRef(){
        return db().collection("notifications");
    }

    collectionRef(){
        return NotificationService.collectionRef();
    }

    //notify var is a function to manage errors or success messages to user
    static create(data, notify = () => {}){
        //data = JSON.parse(JSON.stringify(data));
        NotificationService.collectionRef().add(data)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                notify("success", "Notification entry successfully created");
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                notify("error", "Error creating Notification entry: " + error);
            });
    }

    update(data, notify = ()=>{}){
        this.dbRef.update(data).then(function() {
            console.log("Notification entry successfully updated!");
            notify("success", "Notification entry successfully updated!")
        }).catch(function(error) {
            console.error("Error updating Notification entry: ", error);
            notify("error", "Error updating Notification entry: " + error)
        });
    }

    static all(action){
        NotificationService.collectionRef().onSnapshot(function(querySnapshot) {
                action(listNotification(querySnapshot));
            }
        );
    }

    static where(action, ...query){
        NotificationService.where(...query).onSnapshot(function(querySnapshot) {
                action(listNotification(querySnapshot));
            }
        );
    }

    static destroy_all(notificationIds, notify = () => {}){
        let batch = db.batch();

        notificationIds.forEach(notificationId =>{
           batch.delete(NotificationService.collectionRef().doc(notificationId));
        });

        batch.commit().then(function() {
            console.log("Notification entry successfully deleted!");
            notify("success", "Notification entry successfully deleted!")
        }).catch(function(error) {
            console.error("Error removing notification entry: ", error);
            notify("error", "Error removing notification entry: " + error)
        });
    }
}

export default NotificationService;
