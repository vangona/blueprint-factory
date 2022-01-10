import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';
import cloud from "../../img/bottom-cloud.png"

const Container = styled.div`
    ${defaultContainer};
    justify-content: center;
    position: fixed;
    top: 0;
    background-color: #E4EFFF;
    z-index: 9;
`;

const BottomCloud = styled.img`
    position: absolute;
    bottom: 0;
    width: 100%;
    max-height: 20%;
`;

const BackgroundBottomCloud = ({userObj, parent}) => {

    return (
        <Container>
            <BottomCloud src={cloud} />
        </Container>
    );
};

export default BackgroundBottomCloud;