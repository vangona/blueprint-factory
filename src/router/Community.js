import React from 'react';
import styled from 'styled-components';
import CommunityWindow from '../components/community/CommunityWindow';
import CommunityUpperComponent from '../components/community/CommunityUpperComponent';
import { defaultContainer } from '../css/styleConstants';
import CommunityLowerComponent from '../components/community/CommunityLowerComponent';

const Container = styled.div`
    ${defaultContainer};
    justify-content: flex-start;
    padding-bottom: 65px;
`;

const Community = ({userObj}) => {
    return (
        <Container>
            <CommunityUpperComponent />
            <CommunityLowerComponent userObj={userObj} />
        </Container>
    );
};

export default Community;