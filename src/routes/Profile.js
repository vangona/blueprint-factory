import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { authService } from "../fBase";

const Container = styled.div`
    position: absolute;
`;

const Profile = () => {
    const history = useHistory();

    return (
        <Container>
            <button onClick={()=>{
            authService.signOut();
            history.push("/")
            }}>Log Out</button>
        </Container>
    )
}

export default Profile;