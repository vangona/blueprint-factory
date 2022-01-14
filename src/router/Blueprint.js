import React from 'react';
import styled from 'styled-components';
import CytoscapeMindmap from '../components/mindmap/CytoscapeMindmap';
import TargetMindmap from '../components/TargetMindmap';
import { defaultContainer } from '../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
    padding-bottom: 65px;
    box-sizing: border-box;
`;

const Blueprint = ({userObj}) => {
    return (
        <Container>
            <CytoscapeMindmap userObj={userObj} />
            {/* <TargetMindmap userObj={userObj} /> */}
        </Container>        
    );
};

export default Blueprint;