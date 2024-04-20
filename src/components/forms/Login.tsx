import { FormEvent, useState } from 'react'
import {Form, TextField, Button, PasswordField} from "@prismane/core";
import { TextFieldProps, PasswordFieldProps } from '@prismane/core';
import { Flex } from "@prismane/core";
import { useForm } from "@prismane/core/hooks";
import "./Login.css";

function Login(){

    const [value, setValue] = useState("");

    const { handleReset, handleSubmit, register } = useForm({
        fields: {
          email: {
            value: "",
          },
          password: {
            value: "",
          },
        },
      });

    return(
        <div>
           <Form
                onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e, (v) => console.log(v))}
                onReset={handleReset}
                
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