import { useEffect, useState } from "react";
import { Tabs, Flex, fr } from "@prismane/core";
import { RxDrawingPin } from "react-icons/rx";
import {Friend} from "../../utils/interfaces";
import { BiMailSend } from "react-icons/bi";
import "./Friends.css";
import Button_accept from "./buttons/Button_accept";
import Button_mail from "./buttons/Button_mail";
import Button_remove from "./buttons/Button_remove";
import Friend_modal from "./Friend_modal";



function Friends( { className, friend_name, avatar, friend_surname, friend_email, friend_id, button_state, sender_id, status, onClick}: Friend) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Add a state to control the modal's open/close status

    const handleDialogClick = (dialogId: number | null, dialogFriendId: number | null) => {
        onClick(dialogId, dialogFriendId);
        // ваш код для обработки клика
      };

    const fullName = friend_name + " " + friend_surname;

    return(
         <div className={className} onClick={() => setIsModalOpen(!isModalOpen)}>
         <Flex className="member-body">
         <Flex direction="row"  className="text-part">
                <Flex className="dialog-avatar" mr={'1vh'}>
                    <img src={avatar} className="avatar-friend"/>
                </Flex>
                
                <Flex direction="column" justify="center">
                        <label className="fullname">{fullName}</label>
                        <label className="email">{friend_email}</label>
                </Flex>
                </Flex>
                <Flex align="center" className="send-ico">
                        {/*Компоненты с кнопками для определенных состояний*/}
                        { 
                        button_state === "incoming" ? <Button_accept sender={sender_id === null? null : sender_id}/> :
                        button_state === "outcoming"? <Button_remove friend_id={friend_id}/> : null} 
                </Flex>
                    
                
                <Flex>
                <Friend_modal
                    id={friend_id}
                    fullname={fullName}
                    email={friend_email}
                    is_open={isModalOpen}
                    avatar={avatar}
                    sender_id={sender_id}
                    status1={status}
                    onClose={() => setIsModalOpen(!isModalOpen)}
                    onClick={handleDialogClick} // убедитесь, что вы передаете onClick как пропс
                />
                </Flex>
         </Flex>
         
       </div>
    );
}

export default Friends;