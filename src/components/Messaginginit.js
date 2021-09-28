import firebase from "firebase"

export const setToken = async () => {
    if(firebase.messaging.isSupported() === false) {
        console.log("isSupported: ", firebase.messaging.isSupported())
        return null;
    }

    const messaging = firebase.messaging();
    const token = await messaging.requestPermission()
    .then(() => {
        return messaging.getToken();
    })
    .catch((err) => {
        console.log('error : ', err);
        return null;
    })

    console.log('token : ', token)
    return token;
}