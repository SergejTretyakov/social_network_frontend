import { Accordion, Flex } from "@prismane/core";
import { useState, useEffect } from 'react';
import "./Settings.css";
import axios from "axios";
import Cookies from 'universal-cookie';

//ебашим настройки
function Settings(){
const [avatar, setAvatar] = useState("");
const [background, setBackground] = useState("");
const [name, setName] = useState("");
const [surname, setSurname] = useState("");
const [email, setEmail] = useState("");

const handleNameChange = (e: any) => {setName(e.target.value)};
const handleSurnameChange = (e: any) => {setSurname(e.target.value)};
const handleEmailChange = (e: any) => {setEmail(e.target.value)};

const [file, setFile] = useState<any>();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8080/personal_account/user_info`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then(response => {
          if (response.status === 200){
            console.log(response.data);
            setAvatar(response.data.avatar);
            setBackground(response.data.background);
            setName(response.data.first_name);
            setSurname(response.data.last_name);
            setEmail(response.data.email);
          }
      }).catch(error => {})
    }, [])

    //работаем с файлами(загрузка аватара)
    const [avatarFileName, setAvatarFileName] = useState(""); //хранит имя файла
    let api_avatar = '';
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        if (target.files && target.files[0]) {
          const file = target.files[0];
          setAvatarFileName(file.name);
          setFile(file);
        }
      };
      //работаем с фоном
      const [backgroundFileName, setBackgroundFileName] = useState(""); //хранит имя файла
      let api_background = ''; //api для смены фона диалогов
      const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        if (target.files && target.files[0]) {
          const file = target.files[0];
          setBackgroundFileName(file.name);
          setFile(file);
        }
      };


      function uploadAvatar(file: any){
        var formData = new FormData();
        formData.append("image", file);
        axios.post(`http://127.0.0.1:8080/personal_account/change_avatar`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }).then(response => {
            if (response.status === 201){
                console.log(response);
                setAvatar(response.data.link);
                setFile(null);
            }
        }).catch(error =>{console.log(error);}
        
    )
      }

      function uploadBackground(file: any){
        var formData = new FormData();
        formData.append("image", file);
        axios.post(`http://127.0.0.1:8080/personal_account/change_background`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }).then(async response => {
            if (response.status === 201){
                console.log(response);
                await setBackground(response.data.link);
                const cookies = new Cookies();
                cookies.set('background', background);
                setFile(null);
            }
        }).catch(error =>{console.log(error);}
        
    )
      }

      function updateInfo(name: string, surname: string, email: string){
        axios.put(`http://127.0.0.1:8080/personal_account/update_info`, {
        body:{
            "first_name":name,
            "last_name": surname,
            "email": email
        },
            headers: { "Content-Type": 'application/json',
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                
            }}).then(response => {
            if (response.status === 200){
                console.log(response.data);
            }
        }).catch(error => console.log(error))
      }
    //тут рендер
    return(
        <div id="settings-body">
            <div id="avatar">
                <img src={avatar === null? "s" : avatar}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  ></img>
                
            </div>
            <Accordion>
                <Accordion.Item value="first">
                    <Accordion.Control>
                        <label className="settings-label">Аватар</label>
                    <Accordion.Icon />
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Flex justify="between" direction="column">
                        <label className="input-file">
                            
                            <input
                            type="file"
                            name="avatar-file"
                            onChange={handleFileChange}
                            accept="image/*"
                            />
                            <span className="input-file-btn">Выберите файл</span>
                            <span className="input-file-text">{avatarFileName === ""? "Файл не выбран" :  avatarFileName}</span>
 	                    </label>
                        
                            
                        <button className="avatar-button" onClick={() => uploadAvatar(file)}>Загрузить</button>
                        </Flex>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="second">
                    <Accordion.Control>
                        <label className="settings-label">Личная информация</label>
                    <Accordion.Icon />
                    </Accordion.Control>
                    <Accordion.Panel>




                        <Flex direction="column">
                        <label>Имя</label>
                        <input type="text" placeholder="Имя" className="info-changer" value={name} onChange={handleNameChange}></input>
                        <label>Фамилия</label>
                        <input type="text" placeholder="Фамилия" className="info-changer" value={surname} onChange={handleSurnameChange}></input>
                        <label>Почта</label>
                        <input type="text" placeholder="Почта" className="info-changer" value={email} onChange={handleEmailChange}></input>
                        <button className="info-changers-button" onClick={() => updateInfo(name, surname, email)}>Изменить данные</button>
                        </Flex>




                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="third">
                    <Accordion.Control>
                        <label className="settings-label">Фон чата</label>
                    <Accordion.Icon />
                    </Accordion.Control>
                    <Accordion.Panel>
                    <Flex justify="between" direction="column">
                        <label className="input-file">
                            
                            <input
                            type="file"
                            name="background-file"
                            onChange={handleBackgroundChange}
                            accept="image/*"
                            />
                            <span className="input-file-btn">Выберите файл</span>
                            <span className="input-file-text">{backgroundFileName === ""? "Файл не выбран" :  backgroundFileName}</span>
 	                    </label>
                        
                            
                        <button className="avatar-button" onClick={()=> uploadBackground(file)}>Загрузить</button>
                        </Flex>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Settings;