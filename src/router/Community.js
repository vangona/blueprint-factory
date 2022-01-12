import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CommunityWindow from '../components/community/CommunityWindow';
import CommunityUpperComponent from '../components/community/CommunityUpperComponent';
import { defaultContainer } from '../css/styleConstants';
import CommunityLowerComponent from '../components/community/CommunityLowerComponent';
import { dbService } from '../fBase';

const Container = styled.div`
    ${defaultContainer};
    justify-content: flex-start;
    padding-bottom: 65px;
`;

const Community = ({userObj}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState('');
    
    const getUsers = () => {
        dbService.collection("users").onSnapshot(querySnapshot => {
            const userData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(userData);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <Container>
            <CommunityUpperComponent />
            {isLoading 
            ? "Loading..." 
            : <CommunityLowerComponent userObj={userObj} users={users} />
            }
        </Container>
    );
};

export default Community;