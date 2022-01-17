import React from 'react';
import styled from 'styled-components';
import { defaultContainer, targetFactoryContent, targetFactoryContentInput, targetFactoryContentTitle } from '../../../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
    ${targetFactoryContent};
    gap: 20px;
`;

const Title = styled.div`
    ${targetFactoryContentTitle};
    font-size: 25px;
`;

const Bold = styled.span`
    ${targetFactoryContentTitle};
    color: var(--main-blue);
`;

const Content = styled.div`
    font-family: SsurroundAir;
`;

const Name = styled.div``;

const Deadline = styled.div``;

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

const Explain = styled.div`
    font-family: SsurroundAir;
    font-size: 15px;
    color: var(--main-blue);
    text-align: center;
    line-height: 20px;
`;

const Input = styled.textarea`
    ${targetFactoryContentInput};
    height: 120px;
`;

const PrivateBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: SsurroundAir;
    gap: 5px;
`;

const CheckBox = styled.input``;

const Label = styled.label``;

const ShorttermCheck = ({getExplain, explain, name, needArr, deadline, getIsPrivate, isPrivate}) => {

    const onChange = e => {
        const name = e.target.getAttribute('name');
        if (name === 'explain') {
            getExplain(e.target.value);
        } 
        if (name === 'isPrivate') {
            getIsPrivate(e.target.checked);
        }
    }

    return (
        <Container>
            <Title>
                마지막으로 목표를 체크해봐요!
            </Title>
            <Content>
                <Name>
                    {name}
                </Name>
                <Deadline>
                    {deadline}까지
                </Deadline>
                <NeedContainer>
                {needArr.map((need, index) => (
                    <NeedBox key={index}>
                        <Need>{need}</Need>
                    </NeedBox>
                ))}
            </NeedContainer>
            </Content>
            <Explain>
                추가로 설명을 남기고 <br />
                싶은 것이 있다면 적어보세요.
            </Explain>
            <Input type="text" value={explain} name="explain" onChange={onChange}/>
            <PrivateBox>
                <CheckBox name="isPrivate" id="is-private" type="checkbox" checked={isPrivate} onChange={onChange} />
                <Label htmlFor='is-private'>이 목표는 비밀로 할래요.</Label>
            </PrivateBox>
            <Explain>
                목표를 달성하고자 하는 <br />
                이유를 적어두면 아주 좋아요!
            </Explain>
        </Container>
    );
};

export default ShorttermCheck;