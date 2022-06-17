import firebase from "firebase"

export const setToken = async () => {
    if(firebase.messaging.isSupported() === false) {
        console.log("isSupported: ", firebase.messaging.isSupported())
        return null;
    }

    const messaging = firebase.messaging();
    const token = await messaging.getToken()
    .then(token => 
        token
    )
    .catch((err) => {
        console.log('error : ', err);
        return null;
    })

    messaging.onMessage(payload => {
        console.log(payload)
    })

    console.log('token : ', token)
    return token;
}