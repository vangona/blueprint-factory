const { dbService } = require("fBase");

const unComplishTarget = async (ele) => {
  await dbService
    .collection("targets")
    .doc(`${ele.id()}`)
    .update({
      isComplished: false,
    })
    .then(() => {
      alert("다시 화이팅입니다 :)");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default unComplishTarget;