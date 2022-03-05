import React from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai'
import { defaultBtnAction, defaultShadow } from 'css/styleConstants';

const Button = styled.button`
  position: fixed;
  height: 50px;
  width: 50px;
  bottom: 70px;
  right: 30px;
  border-radius: 50%;
  border: none;
  background-color: var(--main-blue);
  z-index: 9;
  ${defaultShadow};
  ${defaultBtnAction};
`

function AddBtn() {
  const onClick = () => {
    alert('눌렸어용');
  }

  return (
    <Button onClick={onClick}>
      <AiOutlinePlus fill='white' size='2x' />
    </Button>
  );
};

export default AddBtn;