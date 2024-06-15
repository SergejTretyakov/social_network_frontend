import { useState } from "react";
import MainPage from "../components/layouts/desktop/MainPage";
import { Flex } from "@prismane/core";
import axios from "axios";
import { Route } from 'react-router-dom';

function GetID(){
  axios.get(`http://127.0.0.1:8080/auth/user/id`,{
        headers: {

        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`

        }}).then(response => {
            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('user_id', response.data);
                
            }
        });
}
  const Main_Page = () => {
  axios.post('http://127.0.0.1:8080/auth/token/verify', {
    token: !localStorage.getItem("accessToken") ? "1" : localStorage.getItem("accessToken"),

  }).then(response => {
  if (response.status === 200) {
    GetID();
  }
  return ;
}).catch(error => 
  {
    axios.post('http://127.0.0.1:8080/auth/token/refresh', {
      refresh: localStorage.getItem("refreshToken"),
    }).then(response => {
      if (response.status === 200){
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
      }
    }).catch(refresherror =>{
      if(refresherror.response.status === 400){
        window.location.assign('http://localhost:5173/');
      }
    })
  }
  );
    return (
      <Flex id="flex">
        <MainPage/>
      </Flex>
    );
    
  };
  
  export default Main_Page;
  