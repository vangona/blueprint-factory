import React, { useEffect } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import {
  defaultContainer,
  defaultShadow,
  spreadShadow,
} from "../../css/styleConstants";

const Container = styled.div`
  ${defaultContainer};
  justify-content: flex-start;
  align-items: flex-start;
  width: 95%;
  height: auto;
  padding: 25px 30px;
  gap: 25px;
  border-radius: 10px;
  ${spreadShadow};
`;

const Title = styled.h1`
  font-family: SsurroundAir;
  font-weight: bold;
  font-size: 18px;
`;

const Explain = styled.span`
  font-family: SsurroundAir;
  color: gray;
  font-size: 14px;
`;

const UsersContainer = styled.div`
  position: relative;
  width: 100%;
  height: 45px;
`;

const UsersBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 45px;
  height: 45px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  background-color: white;
  /* :nth-child(2) {
        left: 30px;
        z-index: 2;
        background-color: green;
    }
    :nth-child(3) {
        left: 60px;
        z-index: 3;
        background-color: yellow;
    }
    :nth-child(4) {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        color: blue;
        left: 90px;
        z-index: 4;
        background-color: lightgray;
    } */
`;

const UserPic = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const UserNumber = styled.span`
  position: absolute;
  bottom: 0px;
  right: 0px;
  color: var(--main-blue);
  font-size: 12px;
`;

function CommunityWindow({ userObj, user }) {
  const navigate = useNavigate();

  const onClickUser = (e) => {
    e.preventDefault();
    const target = document.getElementById("friends");
    localStorage.setItem("blueprint_community_scroll", target.scrollTop);
    navigate(`/${user.uid}/blueprint`);
  };

  return (
    <Container onClick={onClickUser}>
      <Title>{user.displayName}</Title>
      <Explain>{user.bio}</Explain>
      <UsersContainer>
        <UsersBox>
          {user.photoURL ? (
            <UserPic src={user.photoURL} />
          ) : (
            <AiOutlineUser size="75%" />
          )}
        </UsersBox>
        <UserNumber />
      </UsersContainer>
    </Container>
  );
}

export default CommunityWindow;
