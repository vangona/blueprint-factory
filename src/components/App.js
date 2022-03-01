import React, { useEffect, useState } from "react";
import { authService, dbService } from "../fBase";
import Loading from "./loading/Loading";
import AppRouter from "./Router";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // const getTargetData = async (uid) => {
  //     let targetArray = [];
  //     dbService.collection('targets').where('uid', '==', uid).onSnapshot(snapshot => {
  //         snapshot.docs.forEach(doc => {
  //             targetArray.push({...doc.data()});
  //         })
  //     })
  //     return targetArray;
  // }

  const refreshUser = async () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  const getUserObj = () => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        let displayName = "익명";
        let isVisitor = false;
        let isPrivate = false;
        let bio = "";

        await dbService
          .collection("users")
          .doc(`${user.uid}`)
          .get()
          .then(async (snapshot) => {
            isPrivate = snapshot.data().isPrivate;
            bio = snapshot.data().bio;
            if (!snapshot.exists && user.providerData.length) {
              await dbService
                .collection("users")
                .doc(`${user.uid}`)
                .set({
                  uid: user.uid,
                  displayName: user.displayName ? user.displayName : "익명",
                  photoURL: user.photoURL,
                  bio: "",
                  isPrivate: false,
                  isBlueprint: false,
                });
            }
          });

        if (user.providerData.length === 0) {
          isVisitor = true;
          displayName = "방문객";
        }

        if (user.displayName) {
          displayName = user.displayName;
        }

        setUserObj({
          uid: user.uid,
          isPrivate,
          isVisitor,
          photoURL: user.photoURL ? user.photoURL : "",
          displayName,
          bio,
          updateProfile: (args) => user.updateProfile(args),
        });
        setInit(true);
      } else {
        setUserObj(null);
        setInit(true);
      }
    });
  };

  useEffect(() => {
    if (!userObj) {
      getUserObj();
    }
  }, [init]);

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          refreshUser={refreshUser}
          userObj={userObj}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
export default App;
