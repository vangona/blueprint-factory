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

const LongtermCheck = ({getExplain, explain, name, desire, needArr, deadline}) => {

    const onChange = e => {
        getExplain(e.target.value);
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
            <Input type="text" value={explain} onChange={onChange}/>
        </Container>
    );
};

export default LongtermCheck;