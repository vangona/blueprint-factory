import React from 'react';
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
    padding: 0 5%;
`;

const Navigation = () => {
    return (
        <Container>
            <NavBox>홈</NavBox>
            <NavBox>커뮤니티</NavBox>
            <NavBox>청사진</NavBox>
            <NavBox>세팅</NavBox>
        </Container>
    );
};

export default Navigation;