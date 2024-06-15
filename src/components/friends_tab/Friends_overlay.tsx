import { useEffect, useState } from "react";
import { Tabs, Flex } from "@prismane/core";
import { RxDrawingPin } from "react-icons/rx";
import Friends from "./Friends";
import "./Friends.css";
import axios from "axios";
import { Spinner } from "@prismane/core";
import { set } from "react-hook-form";

interface FriendsOverlay{
  onClick: (dialogId: number | null, dialogFriendId: number | null) => void;
}

function setFriendsResult(array: any[], state: string, props:FriendsOverlay){
  let arr: any[] = []; // массив друзей
  arr = array.map((friend, index) =>{
    return (
      <Friends
        key={index}
        className={'friend'}
        self_id={Number(localStorage.getItem("user_id"))}
        avatar={friend.user_info.avatar}
        friend_id={friend.user_info.id}
        friend_name={friend.user_info.first_name}
        friend_surname={friend.user_info.last_name}
        friend_email={friend.user_info.email}
        button_state={state}
        sender_id={friend.user_sender_id}
        status={friend.status}
        onClick={props.onClick}
      />
    );
  });
  return arr;
}



function Friends_overlay(props: FriendsOverlay) {
    //переменные для хранения ответов сервера
    const [accepted, setAccepted] = useState<any[]>([]);
    const [sended, setSended] = useState<any[]>([]);
    const [recieved, setRecieved] = useState<any[]>([]);
    //объекты React render
    const [acceptedReact, setAcceptedReact] = useState<any[]>([]);
    const [sendedReact, setSendedReact] = useState<any[]>([]);
    const [recievedReact, setRecievedReact] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState(true); // флаг загрузки данных
    
    useEffect(() => {
      const intervalId = setInterval(() => {
        axios.get("http://127.0.0.1:8080/friends/all", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              setAccepted(data);
              
              setIsLoading(false);
            }
          })
          .catch(error => 
            {
              axios.post('http://127.0.0.1:8080/auth/token/refresh', {
                refresh: localStorage.getItem("refreshToken"),
              }).then(response => {
                if (response.status === 200){
                  localStorage.setItem('accessToken', response.data.access);
                  localStorage.setItem('refreshToken', response.data.refresh);
                }
              }).catch(refresherror =>{
                if(refresherror.response.status === 400){
                  window.location.assign('http://localhost:5173/');
                }
              })
            }
            );


            axios
          .get("http://127.0.0.1:8080/friends/incoming_request", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              setRecieved(data);
            }
          })
          .catch(error => 
            {
              axios.post('http://127.0.0.1:8080/auth/token/refresh', {
                refresh: localStorage.getItem("refreshToken"),
              }).then(response => {
                if (response.status === 200){
                  localStorage.setItem('accessToken', response.data.access);
                  localStorage.setItem('refreshToken', response.data.refresh);
                }
              }).catch(refresherror =>{
                if(refresherror.response.status === 400){
                  window.location.assign('http://localhost:5173/');
                }
              })
            }
            );

            axios
          .get("http://127.0.0.1:8080/friends/outcoming_request", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              setSended(data);
            }
          })
          .catch(error => 
            {
              axios.post('http://127.0.0.1:8080/auth/token/refresh', {
                refresh: localStorage.getItem("refreshToken"),
              }).then(response => {
                if (response.status === 200){
                  localStorage.setItem('accessToken', response.data.access);
                  localStorage.setItem('refreshToken', response.data.refresh);
                }
              }).catch(refresherror =>{
                if(refresherror.response.status === 400){
                  window.location.assign('http://localhost:5173/');
                }
              })
            }
            );
            renderFriends();
      }, 1000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, []);

    useEffect(() => {
      
      renderFriends();
    }, [accepted || sended || recieved]);

    const renderFriends = () => {
        if (isLoading) { // проверяем флаг загрузки
          return <Spinner />; // отображаем индикатор загрузки
        }
        setAcceptedReact(setFriendsResult(accepted, "friends", props));
        setSendedReact(setFriendsResult(sended, "outcoming", props));
        setRecievedReact(setFriendsResult(recieved, "incoming", props));
      };

    return(
        <Flex>
           <Tabs defaultValue="first">
            <Tabs.List>
                <Tabs.Tab value="first"><label className="friends-tab-label">Друзья</label></Tabs.Tab>
                <Tabs.Tab value="second"><label className="friends-tab-label">Входящие заявки</label></Tabs.Tab>
                <Tabs.Tab value="third"><label className="friends-tab-label">Исходящие заявки</label></Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first" className="friends-tab">
              <Flex direction="column" className="friends-tab-body">
                {acceptedReact.length === 0 ? <div>У вас пока что нет друзей, найдите их в поиске</div>: acceptedReact}
                </Flex>
            </Tabs.Panel>
            <Tabs.Panel className="friends-tab" value="second">
            <Flex direction="column" className="friends-tab-body">
              {recievedReact.length === 0?<div>Нет входящих заявок</div>:recievedReact}
              </Flex>
              </Tabs.Panel>
            <Tabs.Panel className="friends-tab" value="third"><Flex direction="column" className="friends-tab-body">
              {sendedReact.length === 0? <div>Нет исходящих заявок</div>: sendedReact}
              </Flex></Tabs.Panel>
            </Tabs>
        </Flex>
    );
}

export default Friends_overlay;