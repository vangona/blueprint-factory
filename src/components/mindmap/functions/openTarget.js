import { dbService } from "fBase";

const openTarget = async (ele) => {
  await dbService
    .collection("targets")
    .doc(`${ele.id()}`)
    .update({
      isPrivate: false,
    })
    .then(() => {
      alert("공개로 설정 되었습니다.");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default openTarget;