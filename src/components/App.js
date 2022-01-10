import React, { useEffect, useState } from "react";
import { authService, dbService } from "../fBase";
import AppRouter from "./Router";

const App = () => {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    const getTargetData = async (uid) => {
        let targetArray = [];
        await dbService.collection('targets').where('uid', '==', uid).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                targetArray.push({...doc.data()});
            })
        })
        return targetArray;
    }

    const refreshUser = async () => {
        const user = authService.currentUser;
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
    };

    useEffect(() => {
        authService.onAuthStateChanged(async (user) => {
            if (user) {
                const targetData = await getTargetData(user.uid);
                console.log(user.photoURL)
                setUserObj({
                    uid: user.uid,
                    targets: targetData,
                    photoURL: user.photoURL ? user.photoURL : '',
                    displayName: (user.displayName ? user.displayName : "익명"),
                    updateProfile: (args) => user.updateProfile(args),
                });
                setInit(true);
            } else {
                setUserObj(null);
                setInit(true);
            }
        })
    }, [init])

    return (
        <>
        {init 
        ? <AppRouter isLoggedIn={Boolean(userObj)} refreshUser={refreshUser} userObj={ userObj } /> 
        : "Loading..."
        }
        </>
    )
};
export default App;
