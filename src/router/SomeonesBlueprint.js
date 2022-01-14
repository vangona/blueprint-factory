import React from 'react';
import { useParams } from 'react-router-dom';
import CytoscapeMindmap from '../components/mindmap/CytoscapeMindmap';

const SomeonesBlueprint = ({userObj}) => {

    return (
        <div>
            <CytoscapeMindmap userObj={userObj} />
        </div>
    );
};

export default SomeonesBlueprint;