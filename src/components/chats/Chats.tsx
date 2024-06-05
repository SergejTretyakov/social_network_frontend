import { Flex, TextField, Container } from "@prismane/core";
import "./Chats.css";
import ChatToggler from "../togglers/ChatToggler";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import ChatsItem from '../chats_items/ChatsItem';
import { MdSignalWifiStatusbar1Bar } from "react-icons/md";


function Chats(){

    const [value, setValue] = useState("");
    const [status, setStatus] = useState(""); // Хранит текущее состояние
    const [active, setActive] = useState(""); // Хранит текущее состояние
  
    const handleClick = (status: string) => {setStatus(status);};

    const handClick = (status1: string) => useState(setActive(status1));

    return(
        <Flex id="chats-container">
                <Flex id="chats-header">
                    <Container id="search-dialog">
                        <TextField icon={<FaSearch />} size="lg" className="search-chats"  placeholder="Search" />
                    </Container>
                    <Container id="chats-toggler">
                        <ChatToggler onClick={handleClick}></ChatToggler>
                    </Container>
                </Flex>
                <Flex id="chats-body">
                    <ChatsItem className="chat-item" onClick={handClick}
                        avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                    <ChatsItem className="chat-item" onClick={handClick}
                    avatar="https://sun6-23.userapi.com/s/v1/ig2/7OOzEb0OxktK6Ax2XVWGKZFcgvggz0gHSXmH1FNtoGQbCxoQkBXdtRFTj1OwFa3n1QQf8QXz_WOdqTxKltgGeScE.jpg?size=998x998&quality=96&crop=1,41,998,998&ava=1"
                        username="Mark"
                        lastMessage="Привет"
                        lastMessageTime="10:40"
                        >
                    </ChatsItem>
                </Flex>
                <Flex id="chats-footer">
                    <h3>Показать непрочитанные</h3>
                </Flex>
        </Flex>
    );
}

export default Chats;