import MvpBlueprint from 'components/mvp/blueprint/MvpBlueprint';
import Guide from 'components/mvp/guide/Guide';
import { defaultContainer } from 'css/styleConstants';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  align-items: center;
`;

const Mvp = () => {
  return (
    <Container>
      {/* <MvpBlueprint /> */}
      <Guide />
    </Container>
  );
};

export default Mvp;