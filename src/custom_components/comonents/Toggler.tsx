import { useState } from "react";
import { Box, Button, Switch } from "@prismane/core";
import '../styles/Toggler.css'

interface TogglerProps {
    onClick: (status: string) => void;
}

function Toggler({ onClick }: TogglerProps) {

    const [isSignInActive, setIsSignInActive] = useState(true);

    const handleSignInClick = () => {
        setIsSignInActive(true);
        onClick("signin");
    }

    const handleSignUpClick = () => {
        setIsSignInActive(false);
        onClick("signup");
    }


    return(
        <>
            <Box 
            id="back">
                <Button id="SignIn"
                 className={isSignInActive ? "Login-selected" : "Login"}
                 onClick={handleSignInClick}>
                    Sign In
                </Button>
                <Button id="SignUp"
                className={isSignInActive ? "Register" : "Register-selected"}
                onClick={handleSignUpClick}
                >
                    Sign Up
                </Button>
            </Box>
        </>
    );
}
export default Toggler;