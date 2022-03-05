import { dbService } from "fBase";

const privateTarget = async (ele) => {
  await dbService
    .collection("targets")
    .doc(`${ele.id()}`)
    .update({
      isPrivate: true,
    })
    .then(() => {
      alert("비공개로 설정 되었습니다.");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default privateTarget;