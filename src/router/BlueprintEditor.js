import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PlanEdit from "../components/edit/PlanEdit";
import RoutineEdit from "../components/edit/RoutineEdit";
import TargetEdit from "../components/edit/TargetEdit";
import Loading from "../components/loading/Loading";
import { defaultContainer, defaultTitle } from "../css/styleConstants";
import { dbService } from "../fBase";

const Container = styled.div`
  ${defaultContainer}
  justify-content: flex-start;
  margin-top: 50px;
`;

const Title = styled.div`
  ${defaultTitle};
`;

const BackBtn = styled.button``;

function BlueprintEditor({ userObj }) {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [typeName, setTypeName] = useState("");
  const [element, setElement] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const onClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const getElement = async () => {
    await dbService
      .collection("targets")
      .where("id", "==", id)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((el) => el.data());
        setElement(...data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getTypeName = () => {
    if (type === "targets") {
      setTypeName("목표 수정하기");
    }
    if (type === "plan") {
      setTypeName("계획 수정하기");
    }
    if (type === "routine") {
      setTypeName("루틴 수정하기");
    }
  };

  useEffect(() => {
    getTypeName();
    getElement();
  }, [typeName]);

  return (
    <Container>
      <Title>{typeName}</Title>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {type === "target" && (
            <TargetEdit userObj={userObj} element={element} />
          )}
          {type === "longterm" && (
            <TargetEdit userObj={userObj} element={element} />
          )}
          {type === "shortterm" && (
            <TargetEdit userObj={userObj} element={element} />
          )}
          {type === "plan" && <PlanEdit userObj={userObj} element={element} />}
          {type === "routine" && (
            <RoutineEdit userObj={userObj} element={element} />
          )}
        </>
      )}
      <BackBtn onClick={onClick}>돌아가기</BackBtn>
    </Container>
  );
}

export default BlueprintEditor;
