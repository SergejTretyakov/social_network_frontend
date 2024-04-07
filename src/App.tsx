import { useState } from 'react'
import './App.css'
import {Center, Form} from "@prismane/core";
import Register from './custom_components/comonents/Register';
import Toggler from './custom_components/comonents/Toggler';
import Login from './custom_components/comonents/Login';
import PrismaneProvider from '@prismane/core';

const App = () => {
  const [values, setValues] = useState("");
  const [status, setStatus] = useState(""); // Хранит текущее состояние
  
  const handleClick = (status: string) => {setStatus(status);};
  
  return (
    <Center direction="column" justify="center" w="100%">
      <div id="title">
        <h1 id="title-text">Messenger</h1>
      </div>
      <div id="toggler">
        <Toggler onClick={handleClick}/>
      </div>
      <div id="inputs">
      {status === "signup" ? <Register /> : <Login />}
      </div>
    </Center>
  );
  
};

export default App
