import React from 'react';
import { useParams } from 'react-router-dom';

const SomeonesBlueprint = ({userObj}) => {
    const {id} = useParams();

    return (
        <div>
            {id}
            누군가의 청사진
        </div>
    );
};

export default SomeonesBlueprint;