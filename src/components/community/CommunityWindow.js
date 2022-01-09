import React from 'react';
import styled from 'styled-components';
import { defaultContainer, defaultShadow, spreadShadow } from '../../css/styleConstants';
import { FaPlus } from 'react-icons/fa';

const Container = styled.div`
    ${defaultContainer};
    justify-content: flex-start;
    align-items: flex-start;
    width: 85%;
    height: 150px;
    padding: 15px;
    gap: 25px;
    ${spreadShadow};
`;

const Title = styled.h1`
    font-size: 30px;
`;

const Explain = styled.span`
    color: gray;
`;

const UsersContainer = styled.div`
    position: relative;
    width: 100%;
    height: 45px;
`;

const UsersBox = styled.div`
    position: absolute;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: lawngreen;
    :nth-child(2) {
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
    }
`;

const UserPic = styled.img``;

const UserNumber = styled.span`
    position: absolute;
    bottom: 0px;
    right: 0px;
    color: var(--main-blue);
    font-size: 12px;
`;

const CommunityWindow = () => {
    return (
        <Container>
            <Title>
                미라클모닝W
            </Title>
            <Explain>
                뭐 그런 것입니다.
            </Explain>
            <UsersContainer>
                <UsersBox>
                    <UserPic />
                </UsersBox>
                <UsersBox>
                    <UserPic />
                </UsersBox>
                <UsersBox>
                    <UserPic />
                </UsersBox>
                <UsersBox>
                    <FaPlus />
                </UsersBox>
                <UserNumber>
                    4/8
                </UserNumber>
            </UsersContainer>
        </Container>
    );
};

export default CommunityWindow;