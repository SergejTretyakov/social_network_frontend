import { Flex, TextareaField, Form, Grid, Modal, Text } from "@prismane/core";
import { useState, useEffect } from "react";
import Message from '../message/Message';
import "./Dialog.css";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { GetTime } from "../../utils/time_creator";
import { Recieve_message } from "../../utils/interfaces";
import { FaBullseye } from "react-icons/fa6";
import Cookies from "universal-cookie";
import { FaPaperclip } from "react-icons/fa";
import errorMap from "zod/locales/en.js";
import { AnyZodTuple } from "zod";
import { LetterCircleP } from "@phosphor-icons/react";

interface Dialog{
    chatId: number | null,
    friendId: number | null,
}

async function getMessages(chatId: number | null): Promise<any[]> {
    let messages: any[] = [];
    await axios.get(`http://localhost:8080/messages/${chatId}/all`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(response => {
      messages = response.data;
    });
    return messages;
  }

  async function UploadFile(file: any): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("http://localhost:8080/attachments/upload_file", formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log(response);
      return response.data.url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function getFriend(chatId: number, self_id: number): Promise<number> {
    return axios.get(`http://127.0.0.1:8080/dialogue/${chatId}/user`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      }
    }).then(result => {
      let id = 0;
      if (result.data[0].user_recipient_id === self_id) {
        id = result.data[0].user_sender_id;
      } else {
        id = result.data[0].user_recipient_id;
      }
      console.log(id);
      return id;
    }).catch(error => {
      console.error(error);
      throw error;
    });
  }

function Dialog({chatId, friendId}: Dialog){
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messagesData, setMessagesData] = useState<any[]>([]);
    const [messageText, setMessagesText] = useState<any>('');
    const [owner_id, setOwner_id] = useState<any>();
    const [values, setValues] = useState("");
    const [value, setValue] = useState<string>("");
    const self_id = Number(localStorage.getItem("user_id"));
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [messID, setMessID] = useState<number>();
    const [background, setBack] = useState("");
    const [open, setOpen] = useState(false);
    const [err, setErr] = useState("");
    const [file, setFile] = useState<any>();
    var flag = true;
    var idFr: number = 0;


    getFriend(chatId, self_id).then(id => {
      idFr = id;
    }).catch(error => {
      console.error(error.message);
    });

    useEffect(() => {
      const cookies = new Cookies();
      setBack(cookies.get("background"));
    }, [background]);
    
    useEffect(() => {
      
        
        async function fetchMessagesAndConnectToSocket() {
          setMessagesData(await getMessages(chatId));
          console.log(messagesData);
           
          const newSocket = new WebSocket(`ws://localhost:8080/ws/chat/${chatId}/`); // Замените на URL вашего сервера
          setSocket(newSocket);
      
          newSocket.onopen = () => {
            console.log("Подключено к WebSocket серверу");
            // Здесь вы можете отправить сообщение на сервер, если это необходимо
          };
      
          newSocket.onclose = () => {
            console.log("Отключено от WebSocket сервера");
          };
      
          // Здесь вы можете обработать входящие сообщения от сервера
          newSocket.onmessage = async (event) => {
              
              const newMessage = JSON.parse(event.data); // Предполагаем, что сообщение приходит в формате JSON
              console.log("Получено сообщение:", newMessage);
              setMessagesData(await getMessages(chatId));
            };
        }
      
        fetchMessagesAndConnectToSocket();
      
        return () => {
          if (socket !== null) {
            socket.close();
          }
        };
      }, [chatId]);


      const handleSendMessage = async() => {
        let url;
        let pin;
        console.log('handleSendMessage called');
        console.log(idFr);
        if (file){
        url = await UploadFile(file);
        console.log(url);
        }
        if (url){
          pin = "\n Вложение:" + url;
        }
        else{
          pin = "";
        }
        if (socket && value) {
          // Отправляем сообщение на сервер
          const message:any  = {
            message: value + pin,
            user_sender_id: JSON.stringify(self_id),
            user_recipient_id: JSON.stringify(idFr),
            attachments: [
              {
                attachment_url: url,
              }
            ]
            
        }
        console.log(message);
        socket.send(JSON.stringify(message));
          console.log(message);
          setValue("");
        }
      };   
    const handleChange = (e: any) => setValue(e.target.value);

    const updateHandler = (messageId: number, messageText: string) => {
      setValue(messageText);
      setIsEdit(true);
      setMessID(messageId);
    }

    const updateInDB = (messageId: number | undefined) => {
      console.log(value);
      if (messageId){
      axios.patch(`http://127.0.0.1:8080/messages/${messageId}/update`,{
          "text": value
      
    }).then(async response => {
      if (response.status === 200){
          console.log(response);
          setIsEdit(false);
          setValue("");
          setMessagesData(await getMessages(chatId));
      }
    }).catch(error =>{console.log(error);}
      
    )
    }
    }

    const Clip = (event: React.ChangeEvent<HTMLInputElement>) => {
      var url;
      const target = event.target;
      if (target.files && target.files.length > 0) {
          const file = target.files[0];
          if (file.size > 1024 * 1024 * 5) {
            setOpen(!open);
            setErr("Размер одного из файлов превышает 5 мб");
            // Размер файла превышает 5 МБ
            // Выполните соответствующие действия
          }
          else{
            setFile(file)
            //url = UploadFile(file);
          }
        }
       else {
        setOpen(!open);
        setErr("Ошибка: недопустимое количество файлов");
      }
    };
    

    const messages_data = messagesData.map((message, index) => (
        <Message 
            key={index}
            id={message.id}
            className="message" 
            owner={message.user_sender_id === self_id ? true : false}
            text={message.text}
            MessageTime={GetTime(message.date_receive)}
            unreaded={message.is_read}
            updateHandler={updateHandler} // добавьте эту строку
        />
        ));

        
    return(
        <div id="dialog-container" style={{ backgroundImage: background ? `url(${background})` : 'none',}} >
            <Modal open={open} onClose={() => setOpen(false)} closable>
              <Text cl="white">{err}</Text>
            </Modal>

            <Flex id="header"></Flex>
            <Flex id="body" direction="column" justify="end" align="center">
                {messages_data}
            </Flex>
            <Flex w={'80%'}><input type="file" onChange={Clip} id="clip"></input></Flex>
            <Flex id="sender" justify="center">
                <textarea name="message-input" id="message-input" rows={5} wrap="soft" placeholder="Введите сообщение" value={value} onChange={handleChange}></textarea>
                <button id="send-button" onClick={() => {isEdit === false? handleSendMessage() : updateInDB(messID)}}><IoSend color="white"/></button>
            </Flex>
        </div>
    );
}

export default Dialog;