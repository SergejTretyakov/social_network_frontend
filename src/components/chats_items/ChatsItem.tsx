import { useState } from "react";
import { Box, Container, Flex } from "@prismane/core";
import { RxDrawingPin } from "react-icons/rx";
import './ChatsItem.css';


interface ChatItem {
    onClick: (status: string) => void;
    avatar: string;
    username: string;
    lastMessage: string;
    lastMessageTime: string;
    pinned: boolean;
    unreaded: number;
}

function ChatsItem({ onClick, avatar, username, lastMessage, lastMessageTime, pinned, unreaded }: ChatItem) {
    return(
    <div className="item-body">
        <Flex className="dialog-avatar">
            <img src={avatar}/>
        </Flex>
        <Flex className="dialog-info">
            <Flex className="user">
                <label className="username">{username}</label>
                <label className="time-message">{lastMessageTime}</label>
            </Flex>
            <Flex className="message">
                <label>{lastMessage}</label>
            </Flex>
        </Flex>
        <Flex className="counter-or-pin">
            {pinned === true ? <RxDrawingPin /> : <Box className="circle"></Box>}
        </Flex>
    </div>
    );
}

export default ChatsItem;