import React from 'react';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer } from '../../css/styleConstants';
import CommunityWindow from './CommunityWindow';

const Container = styled.div`
    ${defaultContainer};
    justify-content: flex-start;
    padding: 20px 40px 80px 40px;
    gap: 20px;
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 85%;
    height: 45px;
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
    flex-direction: column;
    gap: 30px;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
`;

const CommunityLowerComponent = ({userObj}) => {
    return (
        <Container>
            <NavContainer>
                <NavBox>
                    팀
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
                <CommunityWindow userObj={userObj} />
            </ContentContainer>
        </Container>
    );
};

export default CommunityLowerComponent;