import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { defaultContainer } from '../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
    flex-direction: row;
    height: 50px;
    z-index: 9;
    justify-content: space-between;
`;

const NavBox = styled.div`
    display: flex;
    text-align: center;
    padding: 0 5%;
    :hover {
        cursor: pointer;
    }
`;

const Navigation = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <NavBox onClick={() => {navigate("/")}}>홈</NavBox>
            <NavBox onClick={() => {navigate("/community")}}>커뮤니티</NavBox>
            <NavBox onClick={() => {navigate("/blueprint")}}>청사진</NavBox>
            <NavBox onClick={() => {navigate("/setting")}}>세팅</NavBox>
        </Container>
    );
};

export default Navigation;