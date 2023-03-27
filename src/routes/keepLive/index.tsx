import React, { useEffect, useRef, useState } from 'react'
import { EngineStore } from "./store"



const Engine: React.FC & { Item: React.FC } = (props) => {

  return (
    <EngineStore.Provider value={{}}>

    </EngineStore.Provider>
  );
};
Engine.Item = () => {
  return <></>
};


export const FocusEngine = Engine
export default Engine