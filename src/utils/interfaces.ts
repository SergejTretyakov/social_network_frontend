export interface Recieve_message{
    id: number,
    text: string,
    date_receive: string,
    is_read: boolean,
    user_sender_id: number,
    user_recipient_id: number,
    dialogue_id: number
};

export interface Friend {
    onClick: (dialogId: number | null, dialogFriendId: number | null) => void;
    className: string;
    avatar: string;
    self_id: number;
    friend_id: number;
    friend_name: string;
    friend_surname: string;
    friend_email: string;
    button_state: string;
    sender_id: number;
    status: string | null;
}