import React from 'react';
import { useParams } from 'react-router-dom';
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

const BlueprintMaker = () => {
    const { id } = useParams();

    return (
        <Container>
            <Title>
                목표 만들기
            </Title>
            <TargetFactory parentId={id ? id : null} />
        </Container>
    );
};

export default BlueprintMaker;