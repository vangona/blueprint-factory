import React from 'react';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer, targetFactoryContent, targetFactoryContentInput, targetFactoryContentTitle } from '../../../css/styleConstants';
import img from "../../../img/need.png";

const Container = styled.div`
    ${defaultContainer};
    ${targetFactoryContent};
    gap: 15px;
`;

const Title = styled.div`
    ${targetFactoryContentTitle};
    font-size: 25px;
`;

const Bold = styled.span`
    ${targetFactoryContentTitle};
    color: var(--main-blue);
`;

const Img = styled.img`
    width: 70%;
`;

const Explain = styled.div`
    font-family: SsurroundAir;
    font-size: 15px;
    color: var(--main-blue);
    line-height: 25px;
    text-align: center;
`;

const InputBox = styled.div`
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const Input = styled.input`
    text-align: center;
    ${targetFactoryContentInput};
`;

const Plus = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    background-color: #3F5DAC;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 30px;
    color: white;
    ${defaultBtnAction};
`;

const NeedContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: SsurroundAir;
`;

const NeedBox = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

const Need = styled.div``;

const DeleteBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    background-color: #3F5DAC;
    border: none;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    font-size: 15px;
    color: white;
    ${defaultBtnAction};
`;

const LongtermNeed = ({getNeed, need, needArr, onClickPlus, onClickDelete, target}) => {

    const onChange = e => {
        getNeed(e.target.value);
    }

    return (
        <Container>
            <Title>
                <Bold>{target}</Bold>(을)를 위해 <br /> 
                <Bold>필요한 것</Bold>이 있나요?
            </Title>
            <Img src={img}/>
            <Explain>
                Hint : 이것들은 {target}의 <br />
                하위 단기 목표가 될거에요.
            </Explain>
            <InputBox>    
                <Input type="text" value={need} placeholder='없다면 넘어가도 괜찮아요!' onChange={onChange}/>
                <Plus onClick={onClickPlus}>+</Plus>
            </InputBox>
            <NeedContainer>
                {needArr.map((need, index) => (
                    <NeedBox key={index}>
                        <Need>{need}</Need>
                        <DeleteBtn onClick={onClickDelete}>-</DeleteBtn>
                    </NeedBox>
                ))}
            </NeedContainer>
        </Container>
    );
};

export default LongtermNeed;