import { BsFillXCircleFill } from "react-icons/bs";
import { Flex, fr } from "@prismane/core";
import "../Friends.css"
import axios from "axios";

function RemoveFriend(friend_id: number){
    axios.delete(`http://127.0.0.1:8080/friends/${friend_id}/reject_out`, {
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

function Button_remove(props: {friend_id: number}){
    return (
    <Flex  gap={fr(2)} className="acception-buttons">
        <button className="friend-button" onClick={() => RemoveFriend(props.friend_id)}>
        <BsFillXCircleFill color={'white'} className="friend-ico" />
        </button>
    </Flex> )
}

export default Button_remove;