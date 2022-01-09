import React from 'react';
import styled from 'styled-components';
import CommunityWindow from '../components/community/CommunityWindow';
import CommunityUpperComponent from '../components/community/CommunityUpperComponent';
import { defaultContainer } from '../css/styleConstants';
import CommunityLowerComponent from '../components/community/CommunityLowerComponent';

const Container = styled.div`
    ${defaultContainer};
    justify-content: flex-start;
    margin-bottom: 65px;
`;

const Community = () => {
    return (
        <Container>
            <CommunityUpperComponent />
            <CommunityLowerComponent />
        </Container>
    );
};

export default Community;