import React, { useEffect, useState } from "react";
import { authService, messaging } from "../fBase";
import AppRouter from "./Router";
import "../css/styles.css"
import Loading from "./Loading";

const App = () => {
    const [init, setInit] = useState(false)
    const [userObj, setUserObj] = useState(null);

    const requestToken = () => {
        messaging.getToken(messaging, {vapidKey: "BGN-Bv4j9xNnVRdhL3_1suNa8Rhq9IwQ8gTFZjp7KFjfVWDfvJvCSe_3PBvdOOalysnrNPE7_BAF7BHM94lUgFM"})
        .then((currentToken) => {
            if (currentToken) {
                console.log(currentToken)
            } else {
                console.log("Need registration")
            }
        }).catch((err) => {
            console.log('An error', err);
        })
    }

    messaging.onMessage(function(payload){
        console.log(payload.notification.title);
        console.log(payload.notification.body);
    })

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user)
            } else {
                setUserObj(null);
            }
            setInit(true)
        })
        requestToken();
    }, [])
    return (
        <>
        {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={ userObj } /> : <Loading />}
        </>
    )
};
export default App;
