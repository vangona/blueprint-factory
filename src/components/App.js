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
            if(!snapshot.exists && user.providerData[0].providerId === 'password') {
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
                let displayName = '익명';
                let isPrivate = false;
                let isVisitor = false;
                let bio = '';

                const userData = (await dbService.collection('users').doc(`${user.uid}`).get()).data()
                const targetData = await getTargetData(user.uid);

                if (userData) {
                    getUserData(user);
                    isPrivate = userData.isPrivate;
                    if(userData.bio) {
                        bio = userData.bio;
                    }
                }

                if (user.providerData[0].providerId !== 'password') {
                    isVisitor = true;
                    displayName = '방문객';
                }

                if (user.displayName) {
                    displayName = user.displayName;
                }

                setUserObj({
                    uid: user.uid,
                    targets: targetData,
                    isPrivate,
                    isVisitor,
                    photoURL: user.photoURL ? user.photoURL : '',
                    displayName,
                    bio,
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
        if (!userObj) {
            getUserObj();
        }
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
