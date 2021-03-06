import React, { useEffect } from "react";
import styled from "styled-components";
import { defaultBtnAction, defaultContainer } from "../../css/styleConstants";
import CommunityWindow from "./CommunityWindow";

const Container = styled.div`
  ${defaultContainer};
  justify-content: flex-start;
  padding: 20px 20px 0 20px;
  gap: 20px;
  height: 80vh;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  min-height: 8%;
`;

const NavBox = styled.div`
  width: 100%;
  text-align: center;
  line-height: 45px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  font-family: SsurroundAir;
  font-weight: bold;
  font-size: 14px;
  color: var(--main-blue);
  :first-child {
    background-color: var(--main-blue);
    color: white;
  }
  ${defaultBtnAction};
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 10px 10px var(--nav-height) 10px;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  height: 70vh;
  overflow: scroll;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

function CommunityLowerComponent({ userObj, users, searchWord }) {
  const waitPlz = () => {
    alert("준비중 입니다.");
  };

  const scrollRestoration = () => {
    const box = document.getElementById("friends");
    box.scrollTo(0, localStorage.getItem("blueprint_community_scroll"));
    localStorage.removeItem("blueprint_community_scroll");
  };

  useEffect(() => {
    if (localStorage.getItem("blueprint_community_scroll")) {
      scrollRestoration();
    }
  }, []);

  return (
    <Container>
      <NavContainer>
        <NavBox>친구</NavBox>
        <NavBox onClick={waitPlz}>팀</NavBox>
        <NavBox onClick={waitPlz}>챌린져스</NavBox>
        <NavBox onClick={waitPlz}>메시지</NavBox>
      </NavContainer>
      <ContentContainer id="friends">
        {users
          .filter((el) => !el.isPrivate)
          .filter((el) => el.isBlueprint)
          .filter(
            (el) =>
              el.displayName.includes(searchWord) || el.bio.includes(searchWord)
          )
          .map((user, index) => (
            <CommunityWindow key={index} userObj={userObj} user={user} />
          ))}
      </ContentContainer>
    </Container>
  );
}

export default CommunityLowerComponent;
