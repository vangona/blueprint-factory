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

    const getTargets = (user) => {
        dbService.collection(`${user.uid}`).where("queryType", "==", "target").onSnapshot(querySnapshot => {
            const targetData = querySnapshot.docs.map(snapshot => ({
                ...snapshot.data()
            }));
            setTargets(targetData);
            setInit(true);
        });
    };

    useEffect(() => {
        authService.onAuthStateChanged(async (user) => {
            if (user) {
                let dream;
                await dbService.collection(`${user.uid}`).doc("profile").get().then(data => {
                    dream = data.data().dream;
                })
                setUserObj({
                    uid: user.uid,
                    displayName: (user.displayName ? user.displayName : "익명"),
                    dream,
                    updateProfile: (args) => user.updateProfile(args),
                  })
                getTargets(user);
            } else {
                setUserObj(null);
                setInit(true);
            }
        })
        requestToken();
    }, [])

    const refreshUser = async () => {
        let dream;
        const user = authService.currentUser;
        await dbService.collection(`${user.uid}`).doc("profile").get().then(data => {
            dream = data.data().dream;
        })
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          dream,
          updateProfile: (args) => user.updateProfile(args),
        });
      };

    return (
        <>
        {init 
        ? <AppRouter isLoggedIn={Boolean(userObj)} refreshUser={refreshUser} userObj={ userObj } targets={targets} /> 
        : <Loading />
        }
        </>
    )
};
export default App;
