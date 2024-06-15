import { Flex, TextField, Container, fr } from "@prismane/core";
import "./Chats.css";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef} from "react";
import ChatsItem from '../chats_items/ChatsItem';
import CustomMenu from "../menu/DesktopMenu";
import Friends_overlay from "../friends_tab/Friends_overlay";
import axios from "axios";
import { GetTime } from "../../utils/time_creator";
import { Spinner } from "@prismane/core";
import Settings from "../settings/Settings";
import Friend_modal from "../friends_tab/Friend_modal";
import Friends from "../friends_tab/Friends";
import Cookies from "universal-cookie";

interface Dialog {
    dialogue__title: string;
    text: string;
    date_receive: string;
    dialogue__is_pinned: boolean;
    is_read: boolean;
    dialogue_id: number;
    dialogue__avatar: string;
  }

  interface IntChats {
    onClick: (dialogId: number | null, dialogFriendId: number | null) => void;
    onFriendId: (friendId: number | null) => void; // Добавьте новый обратный вызов для friendId
  }
function Chats(props: IntChats){
    const [value, setValue] = useState("");
    const [active, setActive] = useState(""); //

    const [status, setStatus] = useState("Chats"); // Вкладки

    /*=================================================== */
    const [dialogsData, setDialogsData] = useState<Dialog[]>([]);// Данные, которые получаем с сервера
    const handleClick = (status: string) => {setStatus(status); console.log(status)}; // Отображаем какая вкладка была выбрана
    const [isLoading, setIsLoading] = useState(true); // флаг загрузки данных
    const dialogsRef = useRef<HTMLDivElement>(null); // ссылка на контейнер с диалогами
    /*=================================================== */

    const [settingsData, setSettingsData] = useState<any[]>([]); // Данные для вкладки Settings
    
    /*=================================================== */

    const [ selectedFriend, setSelectedFriend ] = useState<number | null>(null); // Новое состояние для хранения ID выбранного друга

    /*=================================================== */

    const [ searchApi, setSearchApi] = useState(""); //api для поиска
    const [searchResult, setSearchResult] = useState<any[]>([]); //результат по
    const [searchRes, setSearchRes] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        
        //Проверка действующего состояния меню
        if (status === "Chats") {
          setSearchApi("Chats");
            axios
              .get('http://127.0.0.1:8080/messages/last', {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
              }).then(response => {
                if (response.status === 200) {
                  const data = response.data;
                  console.log(data);
                  setDialogsData(data);
                  setIsLoading(false); // сбрасываем флаг загрузки
                }
              })
              .catch(error => {
                console.log(error);
                setIsLoading(false); // сбрасываем флаг загрузки в случае ошибки
              });
        } 
        else if(status === "Friends"){
          setSearchApi("http://127.0.0.1:8080/search/");
        }
        else if (status === "settings") {
          setSearchApi("Settings");
          axios.get('http://127.0.0.1:8080/settings', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          }).then(response => {
            if (response.status === 200) {
              const data = response.data;
              setSettingsData(data); // Обновляем состояние с полученными данными
            }
          });
        }
        else if (status === "Log Out"){
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          axios.post('http://127.0.0.1:8080/auth/token/verify', {
                token: !localStorage.getItem("accessToken") ? "1" : localStorage.getItem("accessToken"),

              }).then(response => {
              if (response.status === 200) 
              return ;
            }).catch(error => 
              {
                axios.post('http://127.0.0.1:8080/auth/token/refresh', {
                  refresh: localStorage.getItem("refreshToken"),
                }).catch(refresherror =>{
                  if(refresherror.response.status === 400){
                    window.location.assign('http://localhost:5173/');
                  }
                })
              }
            )
        };
      
      }, [status, dialogsRef]);


      //Начинаем диалог
      const handleDialogClick = (dialogId: number | null, dialogFriendId: number | null) => {
        props.onClick(dialogId, dialogFriendId);
        props.onFriendId(dialogFriendId); // Вызовите новый обратный вызов для friendId
      };
    const handleChatsItemClick = (dialog: Dialog) => {
        props.onClick(dialog.dialogue_id, null);
      };

      const handleSearch = (api: string, keyword: string) => {
        setValue(keyword);
        if (status === "Chats") {

        }
        else if (status === "Friends") {
          axios.get(`${api}${keyword}`, { // посылаем GET-запрос на сервер
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
              }
              }).then(
                response => {
                  if (response.status === 200) {
                    const data = response.data;
                    setSearchResult(data);
                    console.log(searchResult);
                  }
                }
              )
        }
        else if (status === "Settings") {
          
        }
      }
        
      const self = Number(localStorage.getItem("user_id"));
      useEffect(() => {
          let renderSearchResults = searchResult.map((res, index) => {
            return (<Friends
              key={index}
              className={'friend'}
              avatar={res.avatar}
              friend_id={res.id}
              friend_name={res.first_name}
              friend_surname={res.last_name}
              friend_email={res.email}
              button_state={"searched"}
              sender_id={self}
              status={res.friend_info.status}
              self_id={self}
              onClick={props.onClick}
            />)
          }
            );
            setSearchRes(renderSearchResults);
      }, [searchResult])
      

      const renderChats = () => {
        if (isLoading) { // проверяем флаг загрузки
          return <Spinner />; // отображаем индикатор загрузки
        }
    
        if (dialogsData.length === 0) {
          return <div>No chats</div>;
        }
    
        return dialogsData.map((dialog, index) => (
          <ChatsItem
            key={index}
            onClick={() => props.onClick(dialog.dialogue_id, null)}
            avatar={dialog.dialogue__avatar}
            username={dialog.dialogue__title}
            lastMessage={dialog.text}
            lastMessageTime={GetTime(dialog.date_receive)}
            pinned={dialog.dialogue__is_pinned}
            is_read={dialog.is_read}
            id={dialog.dialogue_id}
          />
        ));
      };
      const [avatar, setAvatar] = useState("");
      const [name, setName] = useState("");
      const [surname, setSurname] = useState("");
      const [email, setEmail] = useState("");
      const [background, setBackground] = useState("");

      axios.get(`http://127.0.0.1:8080/personal_account/user_info`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then(response => {
          if (response.status === 200){
            console.log(response.data);
            setAvatar(response.data.avatar);
            setBackground(response.data.chat_background);
            setName(response.data.first_name);
            setSurname(response.data.last_name);
            setEmail(response.data.email);
          }
      }).catch(error => {})
      const cookies = new Cookies();
      console.log(background);
      cookies.set("background", background);


    return(
        <Flex id="chats-container">
                <Flex id="chats-header" direction="column">
                  <Flex className="prof"direction="column">
                      <Flex direction="row">
                        <img src={avatar} className="avatar_friend"/>
                        <Flex direction="column" justify="center" ml={'10px'}>
                        <label className="fullname">{name + " " + surname}</label>
                        <label className="email">{email}</label>
                        </Flex>
                      </Flex>
                      <Flex direction="row" justify="between">
                        <CustomMenu onClick={handleClick}></CustomMenu>
                        <TextField icon={<FaSearch />} maxLength={50} className="search-chats" name="search" mr={"6vh"} placeholder="Search" onChange={(e: any) => handleSearch(searchApi, e.target.value)}/>
                      </Flex>
                      </Flex>
                </Flex>
                <Flex id="chats-body" ref={dialogsRef}>
                  { status === "Friends" && value !== ""?
                      (searchRes.length === 0? "нет пользователей с такой почтой" : searchRes) : 
                    status === "Chats" ?
                      renderChats() : 
                    status === "Friends" ?
                      <Friends_overlay onClick={props.onClick}/> :
                    status === "Settings"?
                      <Settings/> : <label>Coming soon</label>}
                </Flex>
        </Flex>
    );
}

export default Chats;
