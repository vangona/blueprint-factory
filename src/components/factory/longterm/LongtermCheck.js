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
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: SsurroundAir;
    text-align: center;
`;

const Name = styled.div`
    color: var(--main-blue);
`;

const Desire = styled.div``;

const Deadline = styled.div``;

const NeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

const LongtermCheck = ({getExplain, explain, name, desire, needArr, deadline, isPrivate, getIsPrivate}) => {

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
                <Desire>
                    {desire}(을)를 위해
                </Desire>
                <Deadline>
                    {deadline ? `${deadline}까지` : "평생동안"}
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
            <Input name="explain" type="text" value={explain} onChange={onChange}/>
            <PrivateBox>
                <CheckBox name="isPrivate" id="is-private" type="checkbox" checked={isPrivate} onChange={onChange} />
                <Label htmlFor='is-private'>이 목표는 비밀로 할래요.</Label>
            </PrivateBox>
        </Container>
    );
};

export default LongtermCheck;