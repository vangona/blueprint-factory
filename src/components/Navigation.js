import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    margin: 0;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    height: 80px;
    width: 100%;
`;
const NavComponent = styled.div`
    border: 1px solid black;
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
    color: white;
    :hover {cursor: pointer;}
    :active {transform: scale(0.98)}
`;

const Navigation = () => {
    const history = useHistory();

    const clickNav = (e) => {
        const text = e.target.innerHTML
        if (text === "Home") {
            history.push("/")
        }
        if (text === "Goals") {
            history.push("/goal")
        }
        if (text === "Community") {
            history.push("/community")
        }
        if (text === "Profile") {
            history.push("/profile")
        }
    }

    return (
        <Container>
            <NavComponent onClick={clickNav}>Home</NavComponent>
            <NavComponent onClick={clickNav}>Goals</NavComponent>
            <NavComponent onClick={clickNav}>Community</NavComponent>
            <NavComponent onClick={clickNav}>Profile</NavComponent>
        </Container>
    )
}

export default Navigation;