import React, { useEffect } from 'react';
import styled from 'styled-components';
import CytoscapeMindmap from '../components/mindmap/CytoscapeMindmap';
import TargetMindmap from '../components/TargetMindmap';
import { defaultContainer } from '../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
    padding-bottom: var(--nav-height);
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