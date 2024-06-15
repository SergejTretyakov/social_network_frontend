import { useState } from "react";
import { Box, Container, Flex } from "@prismane/core";
import { RxDrawingPin } from "react-icons/rx";
import './ChatsItem.css';


interface ChatItem {
    key: number;
    onClick: (id: number) => void;
    id: number;
    avatar: string;
    username: string;
    lastMessage: string;
    lastMessageTime: string;
    pinned: boolean;
    is_read: boolean;
}

function ChatsItem({onClick, avatar, username, lastMessage, lastMessageTime, pinned, is_read, id }: ChatItem) {



    return(
    <div className="item-body" onClick={() => onClick(id)}>
        <Flex className="dialog-avatar">
            <img src={avatar}/>
        </Flex>
        <Flex className="dialog-info">
            <Flex className="user">
                <label className="username">{username}</label>
                <label className="time-message">{lastMessageTime}</label>
            </Flex>
            <Flex className="message">
                <label className="body-messages">{lastMessage}</label>
            </Flex>
        </Flex>
        <Flex className="counter-or-pin">
            {pinned === true ? <RxDrawingPin /> : <Box className="circle"></Box>}
        </Flex>
    </div>
    );
}

export default ChatsItem;