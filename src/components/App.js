import React, { useEffect, useState } from "react";
import { authService, dbService } from "../fBase";
import Loading from "./loading/Loading";
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

    const getSteps = async(uid) => {
        let targetArray = [];
        await dbService.collection('steps').where('uid', '==', uid).get().then(snapshot => {
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

    const getUserData = async (user) => {
        await dbService.collection("users").doc(`${user.uid}`).get().then((snapshot) => {
            if(!snapshot.exists) {
                dbService.collection("users").doc(`${user.uid}`).set({
                    uid: user.uid,
                    displayName: user.displayName ? user.displayName : "익명",
                    photoURL: user.photoURL,
                    bio: "",
                    isPrivate: false,
                })
            }
        })
    }

    const getUserObj = () => {
        authService.onAuthStateChanged(async (user) => {
            if (user) {
                const userData = (await dbService.collection('users').doc(`${user.uid}`).get()).data()
                const targetData = await getTargetData(user.uid);
                const stepData = await getSteps(user.uid);
                if (user.email) {
                    getUserData(user);
                }
                setUserObj({
                    uid: user.uid,
                    targets: targetData,
                    steps: stepData,
                    isPrivate: userData.isPrivate,
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
    }

    useEffect(() => {
        getUserObj();
    }, [init])

    return (
        <>
        {init 
        ? <AppRouter isLoggedIn={Boolean(userObj)} refreshUser={refreshUser} userObj={ userObj } /> 
        : <Loading />
        }
        </>
    )
};
export default App;
