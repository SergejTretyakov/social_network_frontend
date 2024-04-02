import { useState } from 'react'
import {Form, TextField, Button, PasswordField} from "@prismane/core";
import { TextFieldProps, PasswordFieldProps } from '@prismane/core';
import { Flex } from "@prismane/core";
import { useForm } from "@prismane/core/hooks";
import "../styles/Login.css";

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
                onSubmit={(e: SubmitEvent) => handleSubmit(e, (v) => console.log(v))}
                onReset={handleReset}
                
            >
                <Flex className="inputs_login" direction={'column'}>
                    <TextField size="lg" className="logem" {...register("email")} placeholder="Enter email" label="Email:" />
                    <PasswordField size="lg" id="logpass" {...register("password")} placeholder="Enter password" label="Password:" />
                    <div id="submit_cont">
                      <Button type="submit" id="submit">Log In</Button>
                    </div>
                    </Flex>
            </Form>
        </div>
    );
    
}
export default Login