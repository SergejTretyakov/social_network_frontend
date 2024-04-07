import { useState } from "react";
import { Box, Button, Animation, fr} from "@prismane/core";
import '../styles/Toggler.css'

interface TogglerProps {
    onClick: (status: string) => void;
}

function Toggler({ onClick }: TogglerProps) {

    const [animated, setAnimated] = useState(false);
    const [isSignInActive, setIsSignInActive] = useState(true);

    const handleSignInClick = () => {
        window.requestAnimationFrame(() => {
            setIsSignInActive(true);
            onClick("signin");
            setAnimated(false);
        });
    }

    const handleSignUpClick = () => {
        window.requestAnimationFrame(() => {
            setIsSignInActive(false);
            onClick("signup");
            setAnimated(true);
        });
    }


    return(
        <>
            <Box 
            id="back">
                
                <Button id="SignIn"
                 className={'Login'}
                 onClick={handleSignInClick}>
                    Sign In
                </Button>
                <Button id="SignUp"
                className={'Register'}
                onClick={handleSignUpClick}
                >
                    Sign Up
                </Button>
                <Animation
                    id = "toggler-item-back"
                    animated={animated}
                    animation={{
                    in: {
                        transform: "translateX(116%)"
                    },
                    out: { transform: "translateX(0px)"},
                    }}
                />
            </Box>
        </>
    );
}
export default Toggler;