import { useState } from "react";
import { Box, Button, Animation, fr} from "@prismane/core";
import './ChatToggler.css'

interface TogglerProps {
    onClick: (status: string) => void;
}

function ChatToggler({ onClick }: TogglerProps) {

    const [animated, setAnimated] = useState(false);
    const [isSignInActive, setIsSignInActive] = useState(true);

    const handleChatsClick = () => {
        window.requestAnimationFrame(() => {
            setIsSignInActive(true);
            onClick("chats");
            setAnimated(false);
        });
    }

    const handleGroupsClick = () => {
        window.requestAnimationFrame(() => {
            setIsSignInActive(false);
            onClick("groups");
            setAnimated(true);
        });
    }


    return(
        <>
            <Box 
            id="toggler-back">
                
                <Button id="Chats"
                 className={'btn'}
                 onClick={handleChatsClick}>
                    Chats
                </Button>
                <Button id="Groups"
                className={'btn'}
                onClick={handleGroupsClick}
                >
                    Groups
                </Button>
                <Animation
                    id = "toggler-chatitem-back"
                    animated={animated}
                    animation={{
                    in: {
                        transform: "translateX(125%)"
                    },
                    out: { transform: "translateX(0px)"},
                    }}
                />
            </Box>
        </>
    );
}
export default ChatToggler;