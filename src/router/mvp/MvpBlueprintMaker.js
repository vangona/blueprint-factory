import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TermChoice from "components/factory/TermChoice";
import Loading from "components/loading/Loading";
import { defaultContainer, defaultTitle } from "css/styleConstants";
import { dbService } from "fBase";
import MvpLongtermFactory from "components/mvp/factory/MvpLongtermFactory";
import MvpShorttermFactory from "components/mvp/factory/MvpShorttermFactory";
import MvpPlanFactory from "components/mvp/factory/MvpPlanFactory";
import MvpRoutineFactory from "components/mvp/factory/MvpRoutineFactory";

const Container = styled.div`
  ${defaultContainer}
  justify-content: flex-start;
  padding-top: 50px;
  z-index: 10;
`;

const Title = styled.div`
  ${defaultTitle};
  margin-top: 30px;
  z-index: 9;
  font-family: Ssurround;
`;

function MvpBlueprintMaker({ userObj }) {
  const { id, type } = useParams();
  const [typeName, setTypeName] = useState("");
  const [parent, setParent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getParent = async () => {
    if (id) {
      await dbService
        .collection("targets")
        .where("id", "==", id)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((el) => el.data());
          setParent(...data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      const initParent = {
        name: "new",
        id: "new",
        deadline: "",
      };
      setParent(initParent);
      setIsLoading(false);
    }
  };

  const getTypeName = () => {
    if (type === "targets") {
      setTypeName("어떤 목표를 만들어볼까요?");
    }
    if (type === "plan") {
      setTypeName("계획 세우기");
    }
    if (type === "routine") {
      setTypeName("루틴 만들기");
    }
  };

  useEffect(() => {
    getTypeName();
    getParent();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Title>{typeName || "뀨"}</Title>
          {(type === "targets") | (type === "incomplete") && (
            <TermChoice userObj={userObj} parent={parent || undefined} />
          )}
          {type === "longterm" && (
            <MvpLongtermFactory userObj={userObj} parent={parent || undefined} />
          )}
          {type === "shortterm" && (
            <MvpShorttermFactory userObj={userObj} parent={parent || undefined} />
          )}
          {type === "plan" && (
            <MvpPlanFactory userObj={userObj} parent={parent || undefined} />
          )}
          {type === "routine" && (
            <MvpRoutineFactory userObj={userObj} parent={parent || undefined} />
          )}
        </Container>
      )}
    </>
  );
}

export default MvpBlueprintMaker;
