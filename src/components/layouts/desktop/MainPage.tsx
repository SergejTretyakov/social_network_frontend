import { Flex } from "@prismane/core";
import DesktopMenu from "../../menu/DesktopMenu";
import Chats from "../../chats/Chats"
import Dialog from "../../dialog/Dialog"
import "./MainPage.css";

function MainPage(){
    return(
        <Flex id="page">
            <DesktopMenu></DesktopMenu>
            <Chats></Chats>
            <Dialog></Dialog>
        </Flex>
    )
}
export default MainPage;