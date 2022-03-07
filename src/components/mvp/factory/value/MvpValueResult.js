import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from "uuid";
import NextBtn from 'components/btn/NextBtn';
import Loading from 'components/loading/Loading';
import { defaultContainer } from 'css/styleConstants';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  font-family: SsurroundAir;
  line-height: 160%;
  gap: 10px;
`;

const AnswerContainer = styled.div`
  max-width: 80vw;
`;

const AnswerBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const AnsweredQuestion = styled.div`
  white-space: pre-line;
  margin-right: 10px;
`;

const AnsweredContent = styled.div`
  font-family: Ssurround;
`;

const ValueContext = styled.div`
  white-space: pre-line;
  max-width: 80vw;
`;

const ValueTitle = styled.h1`
  max-width: 80vw;
  white-space: pre-line;
`;

const ValueInput = styled.input`
  margin: 20px;
`;

const SubmitBtn = styled.button`
  padding: 10px 20px;
  background-color: white;
  color: var(--main-blue);
  border-radius: 20px;
`;

const MvpValueResult = () => {
  const navigate = useNavigate();
  const [isLoading, SetIsLoading] = useState(true);
  const [answerArr, setAnswerArr] = useState([]);
  const [value, setValue] = useState('');

  const onSubmit = () => {
    const id = uuidv4();
    const valueObj = {
      id,
      name : value,
      description : '',
      needs : '',
      innerDesire : '',
      deadline : '',
      prize : '',
      type : 'value',
      modified_dttm : '',
      registered_dttm : Date.now(),
      cancel_reason : '',
      difficulty : '',
      complished_feeling : '',
      complished_reason : '',
    }

    localStorage.setItem('blueprint-factory_target', JSON.stringify([valueObj]));
    navigate('/mvp')
  }

  const onChange = (e) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    const savedArr = JSON.parse(localStorage.getItem('blueprint-factory_answer'));
    setAnswerArr(savedArr);
    console.log(answerArr);
    SetIsLoading(false);
  }, [isLoading]);

  return (
    <>
      {isLoading 
        ? <Loading />
        :       
        <Container>
          <AnswerContainer>
            <AnswerBox>
              <AnsweredQuestion>
                {answerArr[0].question}
              </AnsweredQuestion>
              <AnsweredContent>
                {answerArr[0].answer}
              </AnsweredContent>
            </AnswerBox>
            <AnswerBox>
              <AnsweredQuestion>
                {answerArr[1].question}
              </AnsweredQuestion>
              <AnsweredContent>
                {answerArr[1].answer}
              </AnsweredContent>
            </AnswerBox>
            <AnswerBox>
              <AnsweredQuestion>
                {answerArr[2].question}
              </AnsweredQuestion>
              <AnsweredContent>
                {answerArr[2].answer}
              </AnsweredContent>
            </AnswerBox>
          </AnswerContainer>

          <ValueContext>
            이제 위의 대답을 
            Arisona에 사시는 John Carter씨의 대답이라고 생각한다면
          </ValueContext>
          <ValueTitle>
            John Carter씨는 무엇을 소중하게 생각하시는 것   같나요?
          </ValueTitle>
          <ValueInput type="text" onChange={onChange} value={value} />
          
          <SubmitBtn onClick={onSubmit}>청사진 만들러 가기</SubmitBtn>
        </Container>
      }
    </>
  );
};

export default MvpValueResult;