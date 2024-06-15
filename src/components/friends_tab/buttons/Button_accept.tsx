import { BsCheckCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";
import { Flex, fr } from "@prismane/core";
import "../Friends.css"
import axios from "axios";

function AcceptFriend(id: number){
    axios.post(`http://127.0.0.1:8080/friends/${id}/add`, null, {
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
function RemoveFriend(friend_id: number){
    axios.delete(`http://127.0.0.1:8080/friends/${friend_id}/reject_inc`, {
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

function Button_accept(props: {sender: number}){
    let state = true;
    if (props.sender === null){
        state = false;
    }
    return (    
    <Flex  gap={fr(2)} className="acception-buttons">
        <button className="friend-button" disabled={state? false : true} onClick={() => AcceptFriend(props.sender)}>
        <BsCheckCircleFill color={'white'} className="friend-ico" />
        </button>
        <button className="friend-button" disabled={state? false : true} onClick={() => RemoveFriend(props.sender)}>
        <BsFillXCircleFill color={'white'} className="friend-ico" />
        </button>
    </Flex> )
    
}

export default Button_accept;