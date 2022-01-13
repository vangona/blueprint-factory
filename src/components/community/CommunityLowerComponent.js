import React from 'react';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer } from '../../css/styleConstants';
import CommunityWindow from './CommunityWindow';

const Container = styled.div`
    ${defaultContainer};
    justify-content: flex-start;
    padding: 20px 20px 60px 20px;
    gap: 20px;;
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
    color: var(--main-blue);
    :first-child {
        background-color: var(--main-blue);
        color: white;
    }
    ${defaultBtnAction};
`;

const ContentContainer = styled.div`
    display: flex;
    padding: 10px 10px;
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

const CommunityLowerComponent = ({userObj, users}) => {
    return (
        <Container>
            <NavContainer>
                <NavBox>
                    팀
                    {users[0].displayName}
                </NavBox>
                <NavBox>
                    친구
                </NavBox>
                <NavBox>
                    챌린져스
                </NavBox>
                <NavBox>
                    메시지
                </NavBox>
            </NavContainer>
            <ContentContainer>
                {users.map((user, index) => (
                    <CommunityWindow key={index} userObj={userObj} user={user} />
                ))}
            </ContentContainer>
        </Container>
    );
};

export default CommunityLowerComponent;