import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { authService } from '../fBase';

const Signout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        authService.signOut().then(navigate("/")).catch(error => {console.log(error.message)});
    })

    return (
        <div>
            none
        </div>
    );
};

export default Signout;