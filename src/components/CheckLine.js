import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const CheckBox = styled.input``;

const Content = styled.span``;

const CheckLine = ({line}) => {
    const [isChecked, setIsChecked] = useState(false);

    const onChange = () => {
        setIsChecked(!isChecked);
    }

    return (
        <Container>
            <CheckBox onChange={onChange} type="checkbox"/>
            <Content style={{textDecorationLine: isChecked ? 'line-through' : 'none'}}>
                {line}
            </Content>
        </Container>
    )
}

export default CheckLine;