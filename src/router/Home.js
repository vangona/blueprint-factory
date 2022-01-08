import React from 'react';
import styled from 'styled-components';
import TargetMindmap from '../components/TargetMindmap';
import TodoToday from '../components/todo/TodoToday';
import { defaultContainer } from '../css/styleConstants';

const Container = styled.div`
  ${ defaultContainer }
  margin-top: 30px;
`;

const Home = ({userObj}) => {
  return (
    <Container>
      <TodoToday userObj={userObj} />
    </Container>
  );
}

export default Home;
