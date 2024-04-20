import { useState } from 'react'
import './Start_page.css'
import {Center, Form} from "@prismane/core";
import Register from '../components/forms/Register';
import StartToggler from '../components/togglers/StartToggler';
import Login from '../components/forms/Login';
import PrismaneProvider from '@prismane/core';


const StartPage = () => {
  const [values, setValues] = useState("");
  const [status, setStatus] = useState(""); // Хранит текущее состояние
  
  const handleClick = (status: string) => {setStatus(status);};
  
  return (
    <Center direction="column" justify="center" w="100%">
      <div id="title">
        <h1 id="title-text">Messenger</h1>
      </div>
      <div id="toggler">
        <StartToggler onClick={handleClick}/>
      </div>
      <div id="inputs">
      {status === "signup" ? <Register /> : <Login />}
      </div>
    </Center>
  );
  
};

export default StartPage;
