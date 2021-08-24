import React, { useState } from "react";
import styled from "styled-components";
import { dbService } from "../fBase";
import { v4 as uuidv4} from "uuid";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    z-index: 999;
`;

const CheerName = styled.h3`
    margin-bottom: 20px;
    font-size: 18px;
`;

const CheerForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CheerInput = styled.input`
`;

const Submit = styled.button`
`;

const CheerRegister = () => {
    const [cheerName, setCheerName] = useState('');

    const onChange = (e) => {
        setCheerName(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (cheerName) {
            const cheerId = uuidv4();
            const cheer = cheerName;
            const cheerObj = {
                cheer,
                cheerId,
            }
            await dbService.collection("cheers").doc(cheer).set(cheerObj)
            setCheerName("");
        }
    }

    return (
        <Container>
            <CheerName>
                무슨 응원을 추가하실 건가요?
            </CheerName>
            <CheerForm>
                <CheerInput onChange={onChange} value={cheerName} type="text" />
                <Submit onClick={onSubmit}>추가하기</Submit>
            </CheerForm>
        </Container>
    );
}
  
export default CheerRegister;
  