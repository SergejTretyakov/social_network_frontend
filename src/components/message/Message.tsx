import { useState, useEffect, useRef } from "react";
import { Box, Container, Flex } from "@prismane/core";
import { RxDrawingPin } from "react-icons/rx";
import './Message.css';
import {Menu, fr} from "@prismane/core";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";

interface Message {
    //onClick: (status: string) => void;
    className: string;
    id: number;
    owner: boolean;
    text: string;
    MessageTime: string;
    //pinned: boolean;
    unreaded: boolean;
    updateHandler: (messageId: number, messageText: string) => void; // добавьте эту строку
}

function Message( {/*onClick,*/id, owner, text, MessageTime, className, updateHandler}: Message) {
    const [status, setStatus] = useState("");
    const handleClick = (status: string) => {setStatus(status); console.log(status)}; // Отображаем какая вкладка была выбрана

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
        };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []);

    const deleteHandler = (messageId: number) => {
        axios.delete(`http://127.0.0.1:8080/messages/${messageId}/delete`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
    }).then(response => {
        if (response.status === 201){
            console.log(response.data.message);
        }
    }).catch(error =>{console.log(error);}
        
    )
    }

    return(
        <div className={className} >
            
            <div className={!owner ? "message_body_others": "message_body_owner"} onClick={() => setOpen(!open)}>
                <p className="message-text">{text}</p>
                <p className="message-time">{MessageTime}</p>
                <Menu ref={menuRef} w={fr(45)} open={open} className="message-menu">
                <Menu.Item className="item" onClick={() => {updateHandler(id, text)}} >
                <Menu.Icon>
                    <MdModeEditOutline />
                </Menu.Icon>
                <label className="item">Изменить</label>
                </Menu.Item>
                <Menu.Item className="item" onClick={() => {deleteHandler(id)}}>
                <Menu.Icon>
                    <MdDelete />
                </Menu.Icon>
                <label className="item">Удалить</label>
                </Menu.Item>
            </Menu>
            </div>
        </div>
    );
}

export default Message;

//<Message className="message" owner={user1.id===owner ? true : false} text={user1.text} MessageTime={user1.time} pinned={false} unreaded={true} > </Message>