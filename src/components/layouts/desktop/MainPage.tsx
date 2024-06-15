import { Flex } from "@prismane/core";
import CustomMenu from "../../menu/DesktopMenu";
import Chats from "../../chats/Chats"
import Message from "../../message/Message";
import Dialog from "../../dialog/Dialog"
import "./MainPage.css";
import { useState } from 'react';
import axios from "axios";
import Main_Page from '../../../views/Main_page';
import { Recieve_message } from '../../../utils/interfaces';



function MainPage(){
    const [tab, setStatus] = useState(""); // Хранит текущее состояние
    const [selectedDialogId, setSelectedDialogId] = useState<number | null>(null); // Новое состояние для хранения ID выбранного диалога
    const [friendId, setFriendId] = useState<any>(); // Нов
    const [messages, setMessages] = useState<Recieve_message[]>([]);
    const [dialog, setDialog] = useState<Dialog>();
    
    const handleDialogClick = (dialogId: number | null, dialogFriendId: number | null) => {
        setSelectedDialogId(dialogId);
        setFriendId(dialogFriendId);
      };
    
      const handleFriendId = (friendId: number | null) => {
        setFriendId(friendId);
      };

    return(
        <Flex id="page">
            <Chats onClick={handleDialogClick} onFriendId={handleFriendId} />
            <Dialog chatId={selectedDialogId} friendId={friendId}/>
        </Flex>
    )
}
export default MainPage;