import React from 'react';
import styled from 'styled-components';
import HomeLowerComponent from '../components/home/HomeLowerComponent';
import HomeUpperComponent from '../components/home/HomeUpperComponent';
import { defaultContainer } from '../css/styleConstants';

const Container = styled.div`
  ${ defaultContainer }
  padding-top: 30px;
`;

const Home = ({userObj}) => {
  return (
    <Container>
      <HomeUpperComponent userObj={userObj} />
      <HomeLowerComponent userObj={userObj} />
    </Container>
  );
}

export default Home;
