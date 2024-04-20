import {Avatar, Flex} from "@prismane/core";
import "./DesktopMenu.css";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BiBroadcast } from "react-icons/bi";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineUnarchive } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";


function Menu(){
    return(
        <Flex className="body_back">
            <Flex id="cont1">
                    <Avatar id="avatar-circle" mt={"10px"}>
                    </Avatar>
                    <IoChatbubblesOutline size={"45%"}/>
                    <BiBroadcast size={"45%"} />
                    <IoPersonAddOutline size={"45%"} />
                    <MdOutlineUnarchive size={"45%"}/>
            </Flex>
            <Flex id="cont2">
                <IoNotifications size={"45%"}/>
                <IoMdSettings size={"45%"}/>
            </Flex>
        </Flex>
    );
}

export default Menu