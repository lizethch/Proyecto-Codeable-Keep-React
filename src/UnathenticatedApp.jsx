import { useState } from 'react';
import LoginForm from './components/login-form';
import SignupForm from './components/Signup-Form';
import styled from '@emotion/styled';
import { colors } from './styles/colors';

const CustomLink = styled.button`
background: none;
border: none;
cursor: pointer;
&:hover {
color: ${colors.pink[400]};
}
`;
const UnathenticatedApp = () => {
    const [showLogin, setShowLogin] = useState(true);

    function handleClick(event) {
        event.preventDefault();
        setShowLogin(!showLogin);
    }


    return (

        <div>
            <h1>Welcome to Poke Collection</h1>
            {showLogin ? (
                <LoginForm />
            ) : (
                <SignupForm />
            )}
            <CustomLink onClick={handleClick}>
                {showLogin ? "Create Account" : "Log In"}
            </CustomLink>

        </div>
    );
}

export default UnathenticatedApp