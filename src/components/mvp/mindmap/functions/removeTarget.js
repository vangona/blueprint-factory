import { dbService, firebaseInstance } from "fBase";

const removeTarget = async (ele) => {
  if (window.confirm("정말 삭제하시겠어요?")) {
    if (ele.data().parentId !== "new") {
      await dbService
        .collection("targets")
        .doc(`${ele.data().parentId}`)
        .update({
          childs: firebaseInstance.firestore.FieldValue.arrayRemove(
            `${ele.id()}`
          ),
        })
        .then(async () => {
          await dbService
            .collection("targets")
            .doc(`${ele.id()}`)
            .delete()
            .then(async () => {
              console.log("delete");
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch(async (error) => {
          await dbService
            .collection("targets")
            .doc(`${ele.id()}`)
            .delete()
            .then(() => {
              console.log("delete");
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
    } else {
      console.log("delete");
    }
  }
};

export default removeTarget;