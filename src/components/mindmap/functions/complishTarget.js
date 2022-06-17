import { dbService } from "fBase";

const complishTarget = async (ele) => {
  await dbService
    .collection("targets")
    .doc(`${ele.id()}`)
    .update({
      isComplished: true,
    })
    .then(() => {
      alert("정말 고생 많으셨습니다.");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default complishTarget;