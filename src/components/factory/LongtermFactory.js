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
import BackgroundTopCloud from "../background/BackgroundTopCloud";
import LongtermParent from "./longterm/LongtermParent";
import LongtermName from "./longterm/LongtermName";
import BackgroundBottomCloud from "../background/BackgroundBottomCloud";
import LongtermDesire from "./longterm/LongtermDesire";
import LongtermNeed from "./longterm/LongtermNeed";
import LongtermDeadline from "./longterm/LongtermDeadline";
import LongtermCheck from "./longterm/LongtermCheck";
import LongtermSimple from "./longterm/LongtermSimple";

const Container = styled.div`
  ${defaultContainer}
`;

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

function LongtermFactory({ userObj, parent }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [isSimple, setIsSimple] = useState(false);
  const [name, setName] = useState("");
  const [desire, setDesire] = useState("");
  const [explain, setExplain] = useState("");
  const [deadline, setDeadline] = useState("");
  const [need, setNeed] = useState("");
  const [needArr, setNeedArr] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isInComplete, setIsInComplete] = useState(false);

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
          deadline: deadline ? new Date(deadline) : "",
          prize: "",
          needArr,
          createdAt: Date.now(),
          modifiedAt: 0,
          isComplete: true,
          isComplished: false,
          isOpen: true,
          isPrivate,
          type: "longterm",
          parentId: [parent.parentId[0]],
          childs: childIds,
          completeFeeling: "",
          cancelReason: "",
        })
        .then(async () => {
          alert("구름이 완성 됐어요!");
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
          deadline: deadline ? new Date(deadline) : "",
          prize: "",
          needArr,
          createdAt: Date.now(),
          modifiedAt: 0,
          isComplete: true,
          isComplished: false,
          isOpen: true,
          isPrivate,
          type: "longterm",
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
                alert("큰 구름이 하나 만들어졌어요!");
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

  const onClickPlus = (value) => {
    if (value !== "") {
      const needArray = [...needArr];
      needArray.push(value);
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

  const getName = (value) => {
    setName(value);
  };

  const getDesire = (value) => {
    setDesire(value);
  };

  const getNeed = (value) => {
    setNeed(value);
  };

  const getDeadline = (value) => {
    setDeadline(value);
  };

  const getExplain = (value) => {
    setExplain(value);
  };

  const getIsPrivate = (value) => {
    setIsPrivate(value);
  };

  useEffect(() => {
    if (parent.type === "incomplete") {
      setIsInComplete(true);
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
        <LongtermSimple
          name={name}
          getName={getName}
          desire={desire}
          getDesire={getDesire}
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
          {page === 1 && <BackgroundTopCloud />}
          {page > 1 && <BackgroundBottomCloud />}
          {page === 1 && <LongtermParent parent={parent} />}
          {page === 2 && (
            <LongtermName parent={parent} target={name} getTarget={getName} />
          )}
          {page === 3 && (
            <LongtermDesire
              getDesire={getDesire}
              desire={desire}
              target={name}
            />
          )}
          {page === 4 && (
            <LongtermNeed
              getNeed={getNeed}
              need={need}
              needArr={needArr}
              onClickPlus={onClickPlus}
              onClickDelete={onClickDelete}
              target={name}
            />
          )}
          {page === 5 && (
            <LongtermDeadline
              getDeadline={getDeadline}
              deadline={deadline}
              target={name}
            />
          )}
          {page === 6 && (
            <LongtermCheck
              getExplain={getExplain}
              explain={explain}
              name={name}
              desire={desire}
              needArr={needArr}
              deadline={deadline}
              getIsPrivate={getIsPrivate}
              isPrivate={isPrivate}
            />
          )}

          {page !== 1 && (
            <PageBtn onClick={onClickPrev} style={{ left: "20px" }}>
              <IoMdArrowRoundBack style={{ fill: "white" }} />
            </PageBtn>
          )}
          {page !== 6 && (
            <PageBtn onClick={onClickNext}>
              <IoMdArrowRoundForward style={{ fill: "white" }} />
            </PageBtn>
          )}
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

export default LongtermFactory;
