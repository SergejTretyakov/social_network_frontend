import { Flex } from "@prismane/core";
import DesktopMenu from "../../menu/DesktopMenu";
import Chats from "../../chats/Chats"
import Dialog from "../../dialog/Dialog"
import "./MainPage.css";
import { useState } from 'react';

function MainPage(){

    const [tab, setStatus] = useState(""); // Хранит текущее состояние
  
    const handleClick = (newtab: string) => {
        if (tab === newtab){
            return;
        }
        else{
            setStatus(newtab);
            console.log(newtab);
        }   
    };

    return(
        <Flex id="page">
            <DesktopMenu onClick={handleClick}></DesktopMenu>
            <Chats></Chats>
            <Dialog></Dialog>
        </Flex>
    )
}
export default MainPage;