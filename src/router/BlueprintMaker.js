import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import TargetFactory from '../components/targets/TargetFactory';
import { defaultContainer, defaultTitle } from '../css/styleConstants';

const Container = styled.div`
    ${defaultContainer}
    justify-content: flex-start;
    margin-top: 50px;
`;

const Title = styled.div`
    ${defaultTitle};
`;

const BlueprintMaker = ({userObj}) => {
    const { id, type } = useParams();
    const location = useLocation();

    return (
        <Container>
            <Title>
                목표 만들기
            </Title>
            <TargetFactory userObj={userObj} parentId={id ? id : null} /> 
        </Container>
    );
};

export default BlueprintMaker;