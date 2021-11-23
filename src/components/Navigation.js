import { faBullseye, faCalendar, faHome, faUserCircle, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 0;
    height: 100px;
    width: 100%;
    background-color: #b7d7e8;
    z-index: 9;
`;

const NavHeader = styled.div`
    display: flex;
    color: white;
    width: 100%;
    height: 50%;
    justify-content: center;
    align-items: center;
    font-family: Kyobo Handwriting;
`;

const NavComponentContainer = styled.div`
    display: flex;
    height: 50%;
    width: 100%;
`;

const NavComponent = styled.div`
    width: 25%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    z-index: 1;
    :hover {cursor: pointer;}
    :active {transform: scale(0.98)}
`;

const Bar = styled.div`
    margin-top: 5px;
    height: 3px;
    width: 40%;
    background-color: white;
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin: 10px;
    color: white;
    font-family: Kyobo Handwriting;
`;

const LogoImg = styled.img`
    width: 30px;
    height: 30px;
`;

const Navigation = ({userObj}) => {
    const [locationName, setLocationName] = useState("/");
    const history = useHistory();

    const clickNav = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "home") {
            history.push("/")
        }
        if (name === "target") {
            history.push("/goal")
        }
        if (name === "todo") {
            history.push("/todo")
        }
        if (name === "community") {
            history.push("/community")
        }
        if (name === "profile") {
            history.push("/profile")
        }
    }

    return (
        <Container>
            <NavHeader>
                내 꿈은 {userObj.dream}한 사람
            </NavHeader>
            <NavComponentContainer>
                <NavComponent name="home" onClick={clickNav}>
                    <FontAwesomeIcon name="home" icon={faHome} />
                    {locationName === "/" && <Bar />}
                </NavComponent>
                <NavComponent name="community" onClick={clickNav}>
                    <FontAwesomeIcon name="community" icon={faUserFriends} />
                    {locationName === "/community" && <Bar />}
                </NavComponent>
                <NavComponent name="target" onClick={clickNav}>
                    <FontAwesomeIcon name="target" icon={faBullseye} />
                    {locationName === "/goal" && <Bar />}
                </NavComponent>
                <NavComponent name="todo" onClick={clickNav}>
                    <FontAwesomeIcon name="todo" icon={faCalendar} />
                    {locationName === "/todo" && <Bar />}
                </NavComponent>
                <NavComponent name="profile" onClick={clickNav}>
                    <FontAwesomeIcon name="profile" icon={faUserCircle} />
                    {locationName === "/profile" && <Bar />}
                </NavComponent>
            </NavComponentContainer>
            <Logo>
                <LogoImg src="/logo192.png"/>
                Cloud
            </Logo>
        </Container>
    )
}

export default Navigation;