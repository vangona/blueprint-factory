import React, { useState } from "react";
import styled from "styled-components";
import {
  defaultBtnAction,
  targetFactoryContentInput,
} from "../../../css/styleConstants";

const StepContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: SsurroundAir;
`;

const StepBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const Step = styled.div`
  width: auto;
`;

const Input = styled.input`
  ${targetFactoryContentInput};
  height: 14px;
  padding: 15px;
  font-size: 10px;
  width: auto;
  ${defaultBtnAction};
`;

function StepInput({
  getDeadlineArr,
  deadlineArr,
  index,
  step,
  minDate,
  maxDate,
}) {
  const [deadline, setDeadline] = useState(
    deadlineArr[index] ? deadlineArr[index] : ""
  );

  const onChange = (e) => {
    getDeadlineArr(e.target.value, index);
    setDeadline(e.target.value);
  };

  return (
    <StepBox key={index}>
      <Step>
        {index + 1}단계 : {step}
      </Step>
      <Input
        id={index}
        type="date"
        min={minDate}
        max={maxDate}
        value={deadline}
        onChange={onChange}
      />
    </StepBox>
  );
}

export default StepInput;
