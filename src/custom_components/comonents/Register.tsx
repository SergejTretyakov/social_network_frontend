import { useState } from 'react'
import {Form, fr, TextField, Button, PasswordField, NativeDateField, Checkbox} from "@prismane/core";
import { Grid } from "@prismane/core";
import { useForm } from "@prismane/core/hooks";
import '../styles/Register.css';

function Register(){

    const [value, setValue] = useState("");

    const [gender, setGender] = useState("");
    const genderChange = (e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value);

    const [date, setDate] = useState("");
    const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

    const [agree, setAgree] = useState("");
    const agreeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAgree(e.target.value);

    const { handleReset, handleSubmit, register } = useForm({
        fields: {
          name: {
            value: "",
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
                onSubmit={(e: SubmitEvent) => handleSubmit(e, (v) => console.log(v))}
                onReset={handleReset}
            >
              <Grid templateColumns={2} gap={20}>
            <TextField size="lg" className="input" {...register("name")} placeholder="Enter name" label="Name:"/>
            <NativeDateField
            size="lg"
              className="input"
              name="date"
              label="Birth date:"
              value={date}
              onChange={dateChange}
              {...register("birth_date")}
            />
            <PasswordField size="lg" className="input" id="pass" {...register("password")} placeholder="Enter password" label="Password:" />
            <TextField size="lg" className="input" {...register("surname")} placeholder="Enter surname" label="Surname:" />
            <TextField size="lg" className="input" id="email" {...register("email")} placeholder="Enter email" label="Email:" />
            <PasswordField size="lg" className="input" id="confirm" {...register("confirm_password")} placeholder="Enter password again" label="Confirm_password:" />
            </Grid>
            <Button type="submit" id="submit">Register</Button>
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
            <a>Terms and Conditions</a>
            </Form>
    )
}
export default Register