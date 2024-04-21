import { FormEvent, useState } from 'react'
import {Form, fr, TextField, Button, PasswordField, NativeDateField, Checkbox} from "@prismane/core";
import { Grid } from "@prismane/core";
import { useForm } from "@prismane/core/hooks";
import './Register.css';
import axios from 'axios';
import { required, min, max, email, match } from '@prismane/core/validators';
import moment from 'moment';
import { z } from "zod";
import p from "../../utils/zodToPrismane";

function Register(){

    const [value, setValue] = useState("");

    const [date, setDate] = useState("");
    const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

    const [agree, setAgree] = useState("");
    const agreeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAgree(e.target.value);

    const { handleReset, handleSubmit, register } = useForm({
      fields: {
        name: {
          value: "",
          validators: {
            required: (v) => p(v, z.string().min(1, {
              message: "Поле обязательно для заполнения",
            })),
            min: (v) => 
            p(v, z.string().min(5, {
              message: "Длина имени должна быть больше 5 символов",
            })),
          },
        },
        surname: {
          value: "",
          validators: {
            required: (v) => p(v, z.string().min(1, {
              message: "Поле обязательно для заполнения",
            })),
            min: (v) => min(v, 4),
          },
        },
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
            min: (v) => min(v, 4),
          },
        },
        confirm_password: {
          value: "",
          validators: {
            required: (v: string) => p(v, z.string().min(1, {
              message: "Поле обязательно для заполнения",
            })),
            match: (v: string) => match(v, register("password").value),
          },
        },
        birth_date:{
          value: date,
          validators: {
            required: (v) => p(v, z.string().min(1, {
              message: "Поле обязательно для заполнения",
            })),
          },
        },
        agreement:{
          value: "",
          validators: {
            required: (v) => required(v),
          },
      },
    },
    });

    async function save() {
           
        axios.post("http://localhost:8000/api/v1/register",{
            name: register("name").value,
            surname: register("surname").value,
            email: register("email").value,
            password: register("password").value,
            birthdayDate: moment(register("birth_date").value ).format("DD/MM/YYYY"), //21/09/2003
            role: "USER"
        }).then(response => {
            console.log(response);
        }).catch(() => {
            console.log({
              name: register("name").value,
              surname: register("surname").value,
              email: register("email").value,
              password: register("password").value,
              birthdayDate: moment(register("birth_date").value).format("DD/MM/YYYY"), //21/09/2003
              role: "USER",
            });
            
        });
    }

    
    return(
           <Form
           id="form"
              onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e, save)}
              onReset={handleReset}
            >
              <Grid templateColumns={2} gap={20} id="grid">
            <div><TextField size="lg" className="input" {...register("name")} placeholder="Enter name" label="Name:"/></div>
            <div><TextField size="lg" className="input" {...register("surname")} placeholder="Enter surname" label="Surname:"/></div>
            <div>
            <NativeDateField
              size="lg"
              className="input"
              name="date"
              label="Birth date:"
              value={date}
              onChange={dateChange}
              {...register("birth_date")}
            />
            </div>
            
            <div><TextField size="lg" className="input" id="email" {...register("email")} placeholder="Enter email" label="Email:"/></div>
            <div><PasswordField size="lg" className="input" id="pass" {...register("password")} placeholder="Enter password" label="Password:" /></div>
            <div><PasswordField size="lg" className="input" id="confirm" {...register("confirm_password")} placeholder="Enter password again" label="Confirm_password:" /></div>
            </Grid>
            <Button type="submit" id="submit">Register</Button>
            <div id="agr">
              <Checkbox
                id="agreement"
                name="agreement"
                mt={'3px'}
                ml={'5px'}
                mr={'10px'}
                value={agree}
                onChange={setAgree}
                {...register("agreement")}
              />
            <label id="label_agree">I agree with</label>
            <a>Terms and Conditions</a></div>
            </Form>
    )
}
export default Register