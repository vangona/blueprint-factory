import React from 'react';
import styled from 'styled-components';
import BackgroundBottomCloud from '../components/background/BackgroundBottomCloud';
import SettingLowerComponent from '../components/settings/SettingLowerComponent';
import SettingUpperComponent from '../components/settings/SettingUpperComponent';
import { defaultContainer } from '../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
`;

const Setting = ({ userObj }) => {
    return (
        <Container>
            <SettingUpperComponent userObj={userObj} />
            <SettingLowerComponent userObj={userObj} />
        </Container>
    );
};

export default Setting;