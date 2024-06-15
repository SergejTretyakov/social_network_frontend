import { useCallback, useEffect, useState } from "react";
import { Tabs, Flex, fr, Modal, Button, Text } from "@prismane/core";
import { RxDrawingPin } from "react-icons/rx";
import {Friend} from "../../utils/interfaces";
import { BiMailSend } from "react-icons/bi";
import "./Friends.css";
import axios, { AxiosError } from "axios";
import { HiOutlineCpuChip } from "react-icons/hi2";

interface Int_FriendModal{
  id: number;
  fullname: string;
  email: string;
  is_open: boolean;
  avatar: string;
  sender_id: number,
  status1: string | null,
  onClose: () => void;
  onClick: (dialogId: number | null, dialogFriendId: number | null) => void;
}

interface DialogResponse {
  dialogue_id: number;
  user_recipient_id: number;
}

async function AddFriend(id: number){
  try {
    const response = await axios.post(`http://127.0.0.1:8080/friends/${id}/request`, null, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return "Заявка отправлена";
  } catch(error) {
    console.log(error);
    return "Ошибка";
  }
}

async function DeleteFriend(id: number){
  try {
    const response = await axios.delete(`http://127.0.0.1:8080/friends/${id}/delete`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return "Добавить в друзья";
  } catch(error) {
    console.log(error);
    return "Ошибка";
  }
}

async function RejectFriend(id: number, sender_id: number){
  var url;
  const self_id = Number(localStorage.getItem("user_id"));
  if (self_id === sender_id){
    url = `http://127.0.0.1:8080/friends/${id}/reject_out`;
  }
  else{
    url = `http://127.0.0.1:8080/friends/${sender_id}/reject_inc`;
  }
  axios.delete(url, {
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

async function CreateDialog(friend_id: number): Promise<any[]> {
  console.log('handleCreateDialog called');
  try {
    const response = await axios.post(
      `http://127.0.0.1:8080/dialogue/${friend_id}/add`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (response.status === 201) {
      return [response.data.dialogue_id, response.data.user_recipient_id];
    }
  } catch (error) {
    const axiosError = error as AxiosError<DialogResponse>;
    if (axiosError.response && axiosError.response.status === 400) {
      return [axiosError.response.data.dialogue_id, axiosError.response.data.user_recipient_id] ;
    }
  }

  return [];
}

function Friend_modal({id, fullname, email, is_open, avatar, sender_id, onClose, status1, onClick}:Int_FriendModal) {
  const [status, setStatus] = useState<string | null>(status1);
  const self_id = Number(localStorage.getItem("user_id"));

  useEffect(() => {
    const fetchStatus = () => {
      axios.get(`http://127.0.0.1:8080/friends/${id}/get_status`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then(response => {
          if (response.status === 200){
            setStatus(response.data.status);
          }
      }).catch(error => {setStatus(null);})
    };
    fetchStatus();
  }, [])

  const handleCreateDialog = useCallback(async (dialogFriendId: number | null) => {
    const dialogId1 = await CreateDialog(id);
    onClick(dialogId1[0], dialogId1[1]);
    // ваш код для обработки клика
  }, [onClick, id]);
  return(
        <>
      <Modal className="profile-body" w={fr(144)} open={is_open} onClose={() => onClose} closable>
        <Flex>
          <img src={avatar} className="profile-img"></img>
          <Flex direction="column" gap={fr(1)} ml={fr(5)} mt={fr(3)}>
            <h2 className="profile-name">{fullname}</h2>
            <label className="profile-email">email: {email}</label>
            <Flex direction="row" mt={fr(2)} gap={fr(2)} >
            <button className="profile-button" onClick={async (e: any) => {
                {
                  if (!status){
                    const req = await AddFriend(id);
                    
                  }
                  else if (status === "ACCEPTED"){
                    const req = await DeleteFriend(id);
                    
                  }
                  else if (status === "WAITING"){
                    const req = await RejectFriend(id, sender_id);
                  }
                }
                
              }}>
                {status === "ACCEPTED"? "Удалить из друзей" :
               (status === "WAITING" && sender_id === self_id)? "Отменить заявку" : 
               (status === "WAITING" && sender_id !== self_id)? "Отклонить заявку" : 
               "Предложить дружить"}
               </button>
              <button className="profile-button" onClick={async (e: any) => {
                {
                  if (status === "WAITING" && sender_id !== self_id){ //принимаем заявку
                    const req = await AcceptFriend(sender_id);
                  }
                  else if (status === "ACCEPTED"){ //пишем сообщения
                    handleCreateDialog(id);
                    onClose();
                  }
                }
                
              }} disabled={!status || status !== "ACCEPTED" && sender_id === self_id}>
                {(status === "WAITING" && sender_id !== self_id)? "Принять заявку" : "Написать сообщение"}
                </button>
            </Flex>
          </Flex>
        </Flex>
        
      </Modal>
    </>
);}

export default Friend_modal;