import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { GiArcheryTarget } from "react-icons/gi";
import { FaRegCalendarAlt, FaUserCircle } from "react-icons/fa";
import {
  defaultBtnAction,
  defaultContainer,
} from "../css/styleConstants";

const profileSize = "40px";

const Container = styled.div`
  ${defaultContainer};
  position: fixed;
  bottom: 0;
  flex-direction: row;
  z-index: 5;
  justify-content: space-between;
  background-color: white;
  height: var(--nav-height);
`;

const NavBox = styled.div`
  display: flex;
  text-align: center;
  padding: 0 5%;
  font-size: 30px;
  z-index: 6;
  :hover {
    cursor: pointer;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  position: fixed;
  top: 20px;
  right: 15px;
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  ${defaultBtnAction};
`;

const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

function Navigation({ userObj }) {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate("/");
  };

  const onClickBlueprint = () => {
    navigate("/blueprint");
  };

  const onClickCommunity = () => {
    navigate("/community");
  };

  const onClickCalendar = () => {
    navigate("/calendar");
  };

  const onClickSetting = () => {
    navigate("/setting");
  };

  return (
    <Container>
      <NavBox onClick={onClickHome}>
        <AiOutlineHome name="home" className="navIcon" />
      </NavBox>
      <NavBox onClick={onClickBlueprint}>
        <GiArcheryTarget className="navIcon" />
      </NavBox>
      <NavBox onClick={onClickCommunity}>
        <FiUsers className="navIcon" />
      </NavBox>
      <NavBox onClick={onClickCalendar}>
        <FaRegCalendarAlt className="navIcon" />
      </NavBox>
      <ProfileBox onClick={onClickSetting}>
        {userObj.photoURL ? (
          <ProfilePic src={userObj.photoURL} />
        ) : (
          <FaUserCircle fontSize={profileSize} fill="#3e83e1" />
        )}
      </ProfileBox>
    </Container>
  );
}

export default Navigation;
