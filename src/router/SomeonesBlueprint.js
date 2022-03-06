import React from 'react';
import ReturnBtn from '../components/btn/ReturnBtn';
import CytoscapeMindmap from '../components/mindmap/CytoscapeMindmap';

function SomeonesBlueprint({ userObj }) {
  return (
    <>
      <ReturnBtn />
      <CytoscapeMindmap userObj={userObj} />
    </>
  );
}

export default SomeonesBlueprint;
