import React, { useEffect, useState } from "react";
import { authService, dbService, messaging } from "../fBase";
import AppRouter from "./Router";
import "../css/styles.css"
import Loading from "./Loading";
import { setToken } from "./Messaginginit";

const App = () => {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null); 
    const [targets, setTargets] = useState([]);

    const requestToken = async () => {
        let token = await setToken();
        console.log('token === ', token)
    }

    const getTargets = async (user) => {
        await dbService.collection(`${user.uid}`).where("queryType", "==", "target").get()
        .then(querySnapshot => {
            const targetData = querySnapshot.docs.map(snapshot => ({
                ...snapshot.data()
            }))
        setTargets(targetData)
    })
    }

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user)
                getTargets(user);
            } else {
                setUserObj(null);
            }
            setInit(true)
        })
        requestToken();
    }, [])
    return (
        <>
        {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={ userObj } targets={targets} /> : <Loading />}
        </>
    )
};
export default App;
