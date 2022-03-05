import { defaultBtnAction } from 'css/styleConstants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Btn = styled.button`
  font-family: Ssurround;
  margin-top: 20px;
  border: 1px solid var(--main-blue);
  border-radius: 15px;
  padding: 10px 20px;
  background-color: white;
  color: var(--main-blue);
  ${defaultBtnAction};
`;

const MoveBtn = ({ value, route, prevFunc }) => {
  const navigate = useNavigate();
  
  const onClick = async () => {
    await prevFunc();
    navigate(route);
  }

  return (
    <Btn onClick={onClick}>
      {value}
    </Btn>
  );
};

MoveBtn.defaultProps = {
  prevFunc: () => {}
}

export default MoveBtn;