import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import { defaultBtnAction, defaultContainer } from "../../css/styleConstants";
import { dbService, firebaseInstance } from "../../fBase";

import ShorttermParent from "./shortterm/ShorttermParent";
import ShorttermBackground from "./shortterm/ShorttermBackground";
import ShorttermName from "./shortterm/ShorttermName";
import ShorttermDigit from "./shortterm/ShorttermDigit";
import ShorttermDeadline from "./shortterm/ShorttermDeadline";
import ShorttermNeed from "./shortterm/ShorttermNeed";
import ShorttermCheck from "./shortterm/ShorttermCheck";
import ShorttermSimple from "./shortterm/ShorttermSimple";

const Container = styled.div`
  ${defaultContainer}
`;

const TargetTitle = styled.h1``;

const TargetForm = styled.form``;

const TargetBox = styled.div``;

const TargetLabel = styled.label``;

const TargetInput = styled.input``;

const TargetBtn = styled.button``;

const NeedBox = styled.div``;

const SimpleBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  transform: scaleY(-1);
  :hover {
    cursor: pointer;
  }
  :active {
    transform: scaleY(-1) scale(0.98);
  }
`;

const ReturnBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  transform: scaleY(-1);
  :hover {
    cursor: pointer;
  }
  :active {
    transform: scaleY(-1) scale(0.98);
  }
`;

const PageBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 50;
  background-color: #3f5dac;
  border: none;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  font-size: 30px;
  ${defaultBtnAction};
`;

const SubmitBtn = styled.input`
  display: flex;
  font-family: SSurroundAir;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  z-index: 10;
  background-color: #3f5dac;
  border: none;
  border-radius: 20px;
  width: auto;
  padding: 10px 15px;
  color: white;
  box-sizing: border-box;
  font-size: 20px;
  ${defaultBtnAction};
`;

function ShorttermFactory({ userObj, parent }) {
  const navigate = useNavigate();
  const [isSimple, setIsSimple] = useState(false);

  const { handleSubmit } = useForm();
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [desire, setDesire] = useState("");
  const [explain, setExplain] = useState("");
  const [deadline, setDeadline] = useState("");
  const [prize, setPrize] = useState("");
  const [need, setNeed] = useState("");
  const [needArr, setNeedArr] = useState([]);
  const [target, setTarget] = useState("");
  const [isInComplete, setIsInComplete] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const onSubmit = async (e) => {
    const targetId = uuidv4();
    const childIds = [];
    needArr.forEach(async (need) => {
      const childId = uuidv4();
      childIds.push(childId);
      await makeChild(need, childId, isInComplete ? parent.id : targetId);
    });
    if (isInComplete) {
      await dbService
        .collection("targets")
        .doc(parent.id)
        .update({
          id: parent.id,
          uid: userObj.uid,
          name,
          desire,
          explain,
          deadline: new Date(deadline),
          prize,
          needArr,
          createdAt: Date.now(),
          modifiedAt: 0,
          isComplete: true,
          isComplished: false,
          isOpen: true,
          isPrivate,
          type: "shortterm",
          parentId: [parent.parentId[0]],
          childs: childIds,
          completeFeeling: "",
          cancelReason: "",
        })
        .then(() => {
          alert("작은 구름이 하나 만들어졌어요!");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      await dbService
        .collection("targets")
        .doc(targetId)
        .set({
          id: targetId,
          uid: userObj.uid,
          name,
          desire,
          explain,
          deadline: new Date(deadline),
          prize,
          needArr,
          createdAt: Date.now(),
          modifiedAt: 0,
          isComplete: true,
          isComplished: false,
          isOpen: true,
          isPrivate,
          type: "shortterm",
          parentId: [parent.id],
          childs: childIds,
          completeFeeling: "",
          cancelReason: "",
        })
        .then(async () => {
          if (parent.id !== "new") {
            dbService
              .collection("targets")
              .doc(`${parent.id}`)
              .update({
                childs:
                  firebaseInstance.firestore.FieldValue.arrayUnion(targetId),
              })
              .then(() => {
                console.log("success");
                alert("작은 구름이 하나 만들어졌어요!");
                navigate("/");
              })
              .catch((error) => {
                console.log(error.message);
              });
          } else {
            await dbService
              .collection("users")
              .doc(`${userObj.uid}`)
              .update({
                isBlueprint: true,
              })
              .then(() => {
                alert("큰 구름이 하나 만들어졌어요!");
                navigate("/");
              })
              .catch((error) => {
                console.log(error.message);
              });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const makeChild = async (need, childId, parentId) => {
    await dbService
      .collection("targets")
      .doc(childId)
      .set({
        id: childId,
        uid: userObj.uid,
        name: need,
        desire: "",
        explain: "",
        deadline: "",
        prize: "",
        needArr: [],
        createdAt: Date.now(),
        modifiedAt: 0,
        isComplete: false,
        isComplished: false,
        isOpen: true,
        isPrivate,
        type: "incomplete",
        parentId: [parentId],
        childs: [],
        completeFeeling: "",
        cancelReason: "",
      });
  };

  const onChange = (e) => {
    const inputName = e.target.id;
    if (inputName === "targetName") {
      setName(e.target.value);
    }
    if (inputName === "targetDesire") {
      setDesire(e.target.value);
    }
    if (inputName === "targetExplain") {
      setExplain(e.target.value);
    }
    if (inputName === "targetDeadline") {
      setDeadline(e.target.value);
    }
    if (inputName === "targetPrize") {
      setPrize(e.target.value);
    }
    if (inputName === "targetNeed") {
      setNeed(e.target.value);
    }
  };

  const onClickPlus = (e) => {
    if (need !== "") {
      const needArray = [...needArr];
      needArray.push(need);
      setNeed("");
      setNeedArr(needArray);
    }
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    const clickedIndex = e.target.parentNode.id;
    const filtered = needArr.filter(
      (el, index) => index !== parseInt(clickedIndex)
    );
    setNeedArr(filtered);
  };

  const getTarget = (value) => {
    setTarget(value);
  };

  const getDigit = (value) => {
    setName(value);
  };

  const getDeadline = (value) => {
    setDeadline(value);
  };

  const getNeed = (value) => {
    setNeed(value);
  };

  const getExplain = (value) => {
    setExplain(value);
  };

  const getIsPrivate = (value) => {
    setIsPrivate(value);
  };

  const onClickReturn = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const onClickPrev = (e) => {
    e.preventDefault();
    setPage(page - 1);
  };

  const onClickNext = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  useEffect(() => {
    if (parent.type === "incomplete") {
      setIsInComplete(true);
      setTarget(parent.name);
      setName(parent.name);
      setPage(3);
    }
  }, []);

  return (
    <Container>
      <SimpleBtn onClick={() => setIsSimple(!isSimple)}>
        <FaExchangeAlt />
      </SimpleBtn>
      <ReturnBtn onClick={onClickReturn}>
        <RiArrowGoBackLine />
      </ReturnBtn>

      {isSimple ? (
        <ShorttermSimple
          target={target}
          getTarget={getTarget}
          name={name}
          getName={getDigit}
          desire={desire}
          getDesire={getExplain}
          explain={explain}
          getExplain={getExplain}
          deadline={deadline}
          getDeadline={getDeadline}
          need={need}
          getNeed={getNeed}
          needArr={needArr}
          onClickPlus={onClickPlus}
          onClickDelete={onClickDelete}
          isPrivate={isPrivate}
          getIsPrivate={getIsPrivate}
          onSubmit={onSubmit}
        />
      ) : (
        <>
          {page === 1 && <ShorttermParent userObj={userObj} parent={parent} />}
          {page > 1 && <ShorttermBackground userObj={userObj} />}
          {page === 2 && (
            <ShorttermName target={target} getTarget={getTarget} />
          )}
          {page === 3 && (
            <ShorttermDigit getDigit={getDigit} digit={name} target={target} />
          )}
          {page === 4 && (
            <ShorttermDeadline
              getDeadline={getDeadline}
              deadline={deadline}
              target={name}
            />
          )}
          {page === 5 && (
            <ShorttermNeed
              getNeed={getNeed}
              need={need}
              needArr={needArr}
              onClickPlus={onClickPlus}
              onClickDelete={onClickDelete}
              target={target}
            />
          )}
          {page === 6 && (
            <ShorttermCheck
              getExplain={getExplain}
              explain={explain}
              name={name}
              needArr={needArr}
              deadline={deadline}
              target={target}
              getIsPrivate={getIsPrivate}
              isPrivate={isPrivate}
            />
          )}

          {page !== 1 && (
            <PageBtn onClick={onClickPrev} style={{ left: "20px" }}>
              <IoMdArrowRoundBack style={{ fill: "white" }} />
            </PageBtn>
          )}
          <PageBtn onClick={onClickNext}>
            <IoMdArrowRoundForward style={{ fill: "white" }} />
          </PageBtn>
          {page === 6 && (
            <SubmitBtn
              type="submit"
              onClick={() => {
                window.confirm(`${name} 목표가 마음에 드시나요?`) && onSubmit();
              }}
              value="제출하기"
            />
          )}
        </>
      )}
    </Container>
  );
}

export default ShorttermFactory;
