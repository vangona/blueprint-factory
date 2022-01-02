import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import Parent from '../components/factory/Parent';
import PlanFactory from '../components/factory/PlanFactory';
import RoutineFactory from '../components/factory/RoutineFactory';
import TermChoice from '../components/factory/TermChoice';
import { defaultContainer, defaultTitle } from '../css/styleConstants';
import { dbService } from '../fBase';

const Container = styled.div`
    ${defaultContainer}
    justify-content: flex-start;
    margin-top: 50px;
`;

const Title = styled.div`
    ${defaultTitle};
`;

const BackBtn = styled.button``;

const BlueprintMaker = ({userObj}) => {
    const { id, type } = useParams();
    const navigate = useNavigate();
    const [typeName, setTypeName] = useState('');
    const [parent, setParent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const onClick = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    const getParent = async () => {
        await dbService.collection('targets').where('id', '==', id).get().then(snapshot => {
            const data = snapshot.docs.map(el => el.data());
            console.log(data);
            setParent(...data);
            setIsLoading(false);
        }).catch(error => {
            console.log(error.message);
        })
    }

    const getTypeName = () => {
        if (type === 'targets') {
            setTypeName('목표 만들기');
        }
        if (type === 'plan') {
            setTypeName('계획 세우기');
        }
        if (type === 'routine') {
            setTypeName('루틴 만들기');
        }
    }

    useEffect(() => {
        getTypeName();
        if (id) {
            getParent();
        }
    }, [])

    return (
        <>
        {isLoading
        ? "Loading..."
            :
            <Container>
                <Title>
                    {typeName}
                </Title>
                {parent && 
                    <Parent parent={parent} />
                }
                {type === "targets" && 
                <TermChoice userObj={userObj} parent={parent ? parent : null} />
                }
                {type === "plan" && <PlanFactory userObj={userObj} parent={parent ? parent : null} /> 
                }
                {type === "routine" && <RoutineFactory userObj={userObj} parent={parent ? parent : null} /> 
                }
                <BackBtn onClick={onClick}>돌아가기</BackBtn>
            </Container>
        }
        </>
    );
};

export default BlueprintMaker;