import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from "uuid";
import { blockBtn, defaultBtnAction, defaultContainer } from '../../../css/styleConstants';
import { dbService, firebaseInstance } from '../../../fBase';
import BackgroundTopCloud from '../../background/BackgroundTopCloud';
import PrevBtn from '../../btn/PrevBtn';

const Container = styled.div`
    ${defaultContainer};
    position: absolute;
    top: 0;
    justify-content: center;
    height: 100vh;
    z-index: 10;
    gap: 15px;
    overflow: hidden;
`;

const Title = styled.h1`
    font-size: 25px;
    font-family: Ssurround;
    text-align: center;
    line-height: 55px;
    z-index: 10;
`;

const TargetName = styled.div`
    color: var(--main-blue);
    font-family: Ssurround;
    z-index: 10;
`;

const Input = styled.input`
    font-family: SsurroundAir;
    background-color: #EEEEEE;
    border-radius: 30px;
    width: 80%;
    height: 45px;
    padding: 20px;
    box-sizing: border-box;
    z-index: 10;
`;

const SubmitBtn = styled.input`
    display: flex;
    font-family: SSurroundAir;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 20px;
    z-index: 99;
    background-color: #3F5DAC;
    border: none;
    border-radius: 20px;
    width: auto;
    padding: 10px 15px;
    color: white;
    box-sizing: border-box;
    font-size: 20px;
    ${defaultBtnAction};
`;

const PrivateBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: SsurroundAir;
    gap: 5px;
    color: black;
    z-index: 99;
`;

const CheckBox = styled.input``;

const Label = styled.label``;

const TodoFactory = ({userObj, parent}) => {
    const navigate = useNavigate();
    const [todo, setTodo] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const onChange = e =>{
        e.preventDefault();
        const name = e.target.getAttribute('name');
        if (name === 'todo') {
            setTodo(e.target.value);
        } 
        if (name === 'deadline') {
            setDeadline(e.target.value);
        }
        if (name === 'isPrivate') {
            setIsPrivate(e.target.checked);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const targetId = uuidv4();
        await dbService.collection('targets').doc(targetId).set({
            id: targetId,
            uid: userObj.uid,
            name: todo,
            desire: '',
            explain: '',
            deadline :  new Date(deadline),
            prize: '',
            needArr : [],
            createdAt: Date.now(),
            modifiedAt: 0,
            isComplete: true,
            isComplished: false,
            isOpen: true,
            isPrivate,
            type: "todo",
            parentId: [parent.id],
            childs: [],
            completeFeeling: '',
            cancelReason: '',
        }).then(() => {
            dbService.collection('targets').doc(`${parent.id}`)
            .update({
                childs: firebaseInstance.firestore.FieldValue.arrayUnion(targetId)
            }).then(() => {
                console.log('success')
                alert('할 수 있습니다!');
                navigate("/")        
            }).catch(error => {
                console.log(error.message);
            })
        }).catch(error => console.log(error.message));
    }

    return (
        <Container>
            <PrevBtn />
            <BackgroundTopCloud />
            <Title>
                할 일 쓰기
            </Title>
            <TargetName>
                {deadline && `${deadline}까지`} {todo && `${todo} 해내기`}
            </TargetName>
            <Input name="todo" value={todo} type="text" onChange={onChange} />
            <Input name="deadline" value={deadline} type="date" onChange={onChange} />

            <PrivateBox>
                <CheckBox name="isPrivate" id="is-private" type="checkbox" checked={isPrivate} onChange={onChange} />
                <Label htmlFor='is-private'>이 할 일은 비밀로 할래요.</Label>
            </PrivateBox>

            {
                todo && deadline && <SubmitBtn type="submit" onClick={onSubmit} value="제출하기" />
            }
        </Container>
    );
};

export default TodoFactory;