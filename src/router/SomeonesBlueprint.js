import React from "react";
import PrevBtn from "../components/btn/PrevBtn";
import CytoscapeMindmap from "../components/mindmap/CytoscapeMindmap";

function SomeonesBlueprint({ userObj }) {
  return (
    <>
      <PrevBtn />
      <CytoscapeMindmap userObj={userObj} />
    </>
  );
}

export default SomeonesBlueprint;
