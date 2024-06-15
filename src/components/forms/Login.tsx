import { FormEvent } from 'react'
import {Form, TextField, Button, PasswordField} from "@prismane/core";
import { Flex } from "@prismane/core";
import { useForm } from "@prismane/core/hooks";
import { z } from "zod";
import p from "../../utils/zodToPrismane";
import "./Login.css";
import axios from 'axios';
import { Route } from 'react-router-dom';

function Login(){


    const path = "http://127.0.0.1:8080/auth/login";

    /* Получение данных с формы и валидация полей */
    const { handleReset, handleSubmit, register } = useForm({
        fields: {
          email: {
            value: "",
            validators: {
              required: (v) => p(v, z.string().min(1, {
                message: "Поле обязательно для заполнения",
              })),
              email: (v: string) => p(v, z.string().email({
                message: "Email не соответсвтует требованиям",
              })),
            },
          },
          password: {
            value: "",
            validators: {
              required: (v) => p(v, z.string().min(1, {
                message: "Поле обязательно для заполнения",
              })),
          },
        },
      }
      });


      /* Отправка данных на сервер */
      async function autorize() {
           
        axios.post(path,{
            email: register("email").value,
            password: register("password").value,
        }).then(response => {
            if (response.status !== 200) return
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            window.location.assign('http://localhost:5173/MainPage/');
        }).catch(error => console.error(error));
    }

    /* Форма входа */
    return(
        <div>
           <Form
                onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e, autorize)}
                onReset={handleReset}
                id='form'
            >
                <Flex className="inputs_login" gap={20} direction={'column'}>
                    <TextField size="lg" className="logem" {...register("email")} placeholder="Enter email" label="Email:" />
                    <div><PasswordField size="lg" id="logpass" {...register("password")} placeholder="Enter password" label="Password:" />
                    <a href="#" id="forgot">Forgot password?</a></div>
                    <div id="submit_cont">
                      <Button type="submit" id="submit">Log In</Button>
                    </div>
                    </Flex>
            </Form>
        </div>
    );
    
}
export default Login