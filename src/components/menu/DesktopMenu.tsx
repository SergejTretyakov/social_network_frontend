import {Avatar, Flex, Container} from "@prismane/core";
import "./DesktopMenu.css";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BiBroadcast } from "react-icons/bi";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineUnarchive } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";

interface MenuProps {
    onClick: (tab: string) => void;
}

function Menu({ onClick }: MenuProps){

    const [tab, setTab] = useState("");

    const handleTab = (index: number) => {
        const tabs = document.querySelectorAll(".tab");
        tabs.forEach((tab) => {
          tab.classList.remove("active-tab");
          tab.classList.add("inactive-tab");
        });
        const selectedTab = tabs[index];
        switch (index) {
          case 0:
            onClick("chat");
            break;
          case 1:
            onClick("channels");
            break;
          case 2:
            onClick("friends");
            break;
          case 3:
            onClick("archive");
            break;
          case 4:
            onClick("notifications");
            break;
          case 5:
            onClick("settings");
            break;
          default:
            onClick("chat");
            break;
        }
        selectedTab.classList.remove("inactive-tab");
        selectedTab.classList.add("active-tab");
      };

    return(
        <Flex className="body_back">
            <Flex id="cont1">
                    <Container id="ava">
                        <Avatar size="base">
                        </Avatar>
                    </Container>
                    <Container>
                        <IoChatbubblesOutline size={"55%"} className="tab active-tab" onClick={() => handleTab(0)} />
                    </Container>
                    <Container>
                        <BiBroadcast size={"55%"} className="tab inactive-tab" onClick={() => handleTab(1)} />
                    </Container>
                    <Container>
                        <IoPersonAddOutline size={"55%"} className="tab inactive-tab" onClick={() => handleTab(2)} />
                    </Container>
                    <Container>
                        <MdOutlineUnarchive size={"55%"} className="tab inactive-tab" onClick={() => handleTab(3)} />
                    </Container>
            </Flex>
            <Flex id="cont2">
                <Container>
                    <IoNotifications size={"50%"} className="tab inactive-tab" onClick={() => handleTab(4)} />
                </Container>
                <Container>
                    <IoMdSettings size={"50%"} className="tab inactive-tab" onClick={() => handleTab(5)} />
                </Container>
            </Flex>
        </Flex>
    );
}

export default Menu