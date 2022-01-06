import React from 'react';
import styled from 'styled-components';
import TargetMindmap from '../components/TargetMindmap';
import { defaultContainer } from '../css/styleConstants';

const Container = styled.div`
  ${ defaultContainer }
  margin-top: 30px;
`;

const Home = ({userObj}) => {
  return (
    <Container>
      <TargetMindmap userObj={userObj} />
    </Container>
  );
}

export default Home;
