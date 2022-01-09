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

const ShorttermCheck = ({getExplain, explain, name, needArr, deadline}) => {

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
            <Input type="text" value={explain} onChange={onChange}/>
        </Container>
    );
};

export default ShorttermCheck;