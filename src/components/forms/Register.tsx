import { FormEvent, useState } from 'react'
import {Form, fr, TextField, Button, PasswordField, NativeDateField, Checkbox} from "@prismane/core";
import { Grid } from "@prismane/core";
import { useForm } from "@prismane/core/hooks";
import './Register.css';
import axios from 'axios';
import { required, min, max } from '@prismane/core/validators';

function Register(){

    const [value, setValue] = useState("");

    const [date, setDate] = useState("");
    const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

    const [agree, setAgree] = useState("");
    const agreeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAgree(e.target.value);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    async function save() {
      try {
        await axios.post("http://localhost:8085/api/v1/employee/save", {
        name: name,
        surname: surname,
        birth_date: date,
        email: email,
        password: password,
        });
        alert("Registation Successfully");
      } catch (err) {
        alert(err);
      }
    }

    const { handleReset, handleSubmit, register } = useForm({
        fields: {
          name: {
            value: "",
            validators: {
              required: (v) => required(v),
              min: (v) => min(v, 4),
            },
          },
          surname: {
            value: "",
          },
          email: {
            value: "",
          },
          password: {
            value: "",
          },
          confirm_password: {
            value: "",
          },
          birth_date:{
            value: date,
          },
          agreement:{
            value: "",
          },
        },
      });

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