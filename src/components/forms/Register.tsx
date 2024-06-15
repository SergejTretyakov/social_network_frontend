import { useState } from 'react'
import {Form, TextField, Button, PasswordField, NativeDateField, Checkbox} from "@prismane/core";
import { Grid } from "@prismane/core";
import { useForm, SubmitHandler } from "react-hook-form";
import './Register.css';
import axios from 'axios';
import registerSchema from '../../utils/schema';
import {RegisterErrors} from '../../utils/schema';

function Register(){

    const path = "http://127.0.0.1:8080/auth/registrations";

    const [state, setState] = useState("");

    const [date, setDate] = useState("");

    const [agree, setAgree] = useState("");

    const [errors, setErrors] = useState<RegisterErrors>({});

    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
      agreement: '',
    });

    const handleChange = (e: any) => {
      const { name, value } = e.target;
      if (name !== 'agreement'){
      setFormData({
          ...formData,
          [name]: value,
      });}
      
      //Проверка по изменению
      if (name === 'name' && !(/^[A-ZА-Я][a-zа-я]{1,14}$/.test(value))){
        setErrors((prevState) => ({
            ...prevState,
            name: 'Имя должно начинаться с заглавной буквы(длина от 2 до 15)',
          }));
      }
      else if (name === 'surname' && !(/^[А-ЯЁA-Z][a-zа-яё]{1,14}(?:-[А-ЯЁA-Z][a-zа-яё]{1,14})*$/.test(value))){
        setErrors((prevState) => ({
            ...prevState,
            surname: 'Фамилия должна начинаться с заглавной буквы(длина от 2 до 15 или до 30 при двойной фамилии)',
          }));
      }
      else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)){
        setErrors((prevState) => ({ 
            ...prevState,
            email: 'Почта не соответствует формату',
            }));
      }
      else if (name === 'password' && !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(value)){
        setErrors((prevState) => ({ 
            ...prevState,
            password: 'Пароль должен содержать минимум 8 символов, хотя бы одну заглавную и строчную буквы, цифру и спец символ',
            }));
      }
      else if (name === 'confirmPassword' && (formData.password !== value)){
        setErrors((prevState) => ({
            ...prevState,
            confirmPassword: 'Пароли не совпадают',
            }));
      }
      else if (name === 'birthDate')
      {
        if (value === ""){
            setErrors((prevState) => ({
                ...prevState,
                birthDate: 'Поле обязательно для заполнения',
                }));
            }
        else{
            let date = new Date(value);
            let now = new Date();
            if (date > now){
                setErrors((prevState) => ({
                    ...prevState,
                    birthDate: 'Дата рождения не может быть в будущем',
                    }));
                }
            
            else if (date < new Date(date.getFullYear()-100)){
                setErrors((prevState) => ({
                    ...prevState,
                    birthDate: 'Дата рождения не может быть больше 100 лет',
                    }));
                }
            
            else{
                setErrors((prevState) => ({
                    ...prevState,
                    birthDate: '',
                    }));
                }
            }
        }
      else if (name === 'agreement' && agree){
        setErrors((prevState) => ({
            ...prevState,
            agreement: 'Необходимо согласие на обработку данных',
            }));
        }
    else{
            setErrors((prevState) => ({
                ...prevState,
                [name]: null,
            }));
            console.log("нет ошибки");
        }
    };
      
    
    const handleSubmit = (e: any) => {
      e.preventDefault();
      const newErrors = registerSchema(formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
          // логика отправки
          console.log('Форма успешно отправлена');
          save(formData);
      } else {
          console.log('Форма не была отправлена из-за ошибки');
          console.log(formData);
      }
  };

    async function save(data: any) {
       
        axios.post(path,{

            first_name: data.name,
            last_name: data.surname,
            email: data.email,
            password: data.password,
            birth_date: data.birthDate, //21/09/2003
        }).then(response => {
            console.log(response);
            if (response.status === 201){
                setFormData({
                    name: '',
                    surname: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    birthDate: '',
                    agreement: '',
                });
                setErrors({});
                setAgree("");
                setDate("");
                setSuccess("Регистрация прошла успешно!");
            }
        }).catch(() => {
            /*console.log({
                first_name: data.name,
                last_name: data.surname,
                email: data.email,
                password: data.password,
                birthDate: data.birthDate, //21/09/2003
            });*/
            setSuccess("");
        });
    };

    
    return(
           <Form
           id="form"
           onSubmit={handleSubmit}
            >
              
              <Grid templateColumns={2} gap={20} id="grid">
            <div><TextField size="lg" className="input" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" label="Имя:"/>
            {errors.name &&
                        <span className="error-message">
                            {errors.name}
                        </span>
                    }
            </div>
            <div><TextField size="lg" className="input" name="surname" value={formData.surname} onChange={handleChange} placeholder="Enter surname" label="Фамилия:"/>
            {errors.surname &&
                        <span className="error-message">
                            {errors.surname}
                        </span>
                    }
            </div>

            

            <div><TextField size="lg" className="input" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" label="Почта:" />
            {errors.email &&
                        <span className="error-message">
                            {errors.email}
                        </span>
                    }
            </div>
            <div id="date">
            <NativeDateField
              id="date-field"
              size="lg"
              name="birthDate"
              className="input"
              label="Дата рождения:"
              value={date}
        onChange={(e: any) => {
            setDate(e.target.value);
            handleChange(e);
            }
        }
            />
            {errors.birthDate &&
                        <span className="error-message">
                            {errors.birthDate}
                        </span>
                    }
            </div>
            <div><PasswordField size="lg" className="input" id="pass" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" label="Пароль:" />
            {errors.password &&
                        <span className="error-message">
                            {errors.password}
                        </span>
                    }
            </div>
            <div><PasswordField size="lg" className="input" id="confirm" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Enter password again" label="Подтверждение пароля:" />
            {errors.confirmPassword &&
                        <span className="error-message">
                            {errors.confirmPassword}
                        </span>
                    }
            </div>
            
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
        onChange={(e: any) => {
            setAgree(e.target.checked);
            handleChange(e);
            setFormData({
                ...formData,
                agreement: e.target.checked,
            });
        }}
                
              />
              
            <label id="label_agree">Я согласен с</label>
            <a>Соглашением пользователя</a></div>
            {errors.agreement &&
                        <span className="error-message">
                            {errors.agreement}
                        </span>
                    }
                    <span>{success}</span>
            </Form>
            
    )
}
export default Register