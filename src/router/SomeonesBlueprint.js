import React from 'react';
import { useParams } from 'react-router-dom';
import PrevBtn from '../components/btn/PrevBtn';
import CytoscapeMindmap from '../components/mindmap/CytoscapeMindmap';

const SomeonesBlueprint = ({userObj}) => {

    return (
        <div>
            <PrevBtn />
            <CytoscapeMindmap userObj={userObj} />
        </div>
    );
};

export default SomeonesBlueprint;