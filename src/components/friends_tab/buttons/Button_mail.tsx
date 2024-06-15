import React, { useState } from "react";
import { Flex } from "@prismane/core";

function Button_mail(props: {dialogue_id: number}) {
    const message:any  = {
        "message": "Привет",
        "user_sender_id": 2,
        "user_recipient_id": 3,
        "attachments": [
        ]
    }
    
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const handleClick = () => {
    const newSocket = new WebSocket(`ws://localhost:8080/ws/chat/${props.dialogue_id}/`); // Замените на URL вашего сервера
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("Подключено к WebSocket серверу");
      // Здесь вы можете отправить сообщение на сервер, если это необходимо
      newSocket.send(JSON.stringify(message));
    };

    newSocket.onclose = () => {
      console.log("Отключено от WebSocket сервера");
    };

    // Здесь вы можете обработать входящие сообщения от сервера
    newSocket.onmessage = (event) => {
      console.log("Получено сообщение:", event.data);
    };
  };

  return (
    <Flex>
      <button onClick={handleClick}>Написать</button>
    </Flex>
  );
}

export default Button_mail;