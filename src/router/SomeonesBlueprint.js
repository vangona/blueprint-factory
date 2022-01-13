import React from 'react';
import { useParams } from 'react-router-dom';
import CytoscapeMindmap from '../components/mindmap/CytoscapeMindmap';

const SomeonesBlueprint = ({userObj}) => {
    const {id} = useParams();

    return (
        <div>
            {id}
            <CytoscapeMindmap userObj={userObj} />
        </div>
    );
};

export default SomeonesBlueprint;