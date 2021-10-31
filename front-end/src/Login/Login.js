import {React, useEffect, useState} from 'react';
import './Login.css';
import axios from 'axios';

const Login = (props) => {
    useEffect(() => {
        document.title = "Showstop";
    }, []);

    /* ------------------------ rotating through wordbank ----------------------- */
    const wordBank = ['watch','will watch','watched']
    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(wordBank[index]);
    useEffect(() => {
        setCurrentWord(wordBank[index])
    }, [index]);
    useEffect(() => {
        setTimeout(() => {
            setIndex(index === wordBank.length - 1 ? 0 : index + 1)       
        }, 2000);
    }, [currentWord]);

    /* ---------------------- registration and login states --------------------- */
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);
    const handleLogin = () => {
        axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/login"
        }).then(res => console.log(res));
    }
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const validateRegistration = (username, password, confirmPassword) => {
        if (username.length < 3) {
            alert("Username must have length of at least 3.");
            return false;
        }
        else if (!usernameRegex.exec(username)) {
            alert("Username must contain only alphanumeric characters.");
            return false;
        }
        else if(password !== confirmPassword) {
            alert("Passwords must match.");
            return false;
        }
        else if(password.length < 8) {
            alert("Password must have length of at least 8.")
            return false;
        }
        return true;
    }
    const handleRegister = () => {
        if (validateRegistration(registerUsername, registerPassword, registerConfirmPassword)) {
            axios({
                method: "POST",
                data: {
                    username: registerUsername,
                    password: registerPassword,
                },
                withCredentials: true,
                url: "http://localhost:4000/register"
            }).then(res => console.log(res));
        }
    }
    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/user"
        }).then(res => {
            setData(res.data);
            console.log(res.data);
        });
    }
    
    /* -------------------- toggling login/registration forms ------------------- */
    const [state, setState] = useState("login");
    const toggleState = () => {
        if(state === "login") {
            setState("register");
        }
        else {
            setState("login");
        }
    }
    const displayForm = () => {
        return state === "register" ? registerForm() : loginForm();
    }
    const loginForm = () => {
        return (
            <div id="form">
                <input type="text" name="username" placeholder="Username" onChange={e => setLoginUsername(e.target.value)}></input>
                <input type="password" name="password" placeholder="Password" onChange={e => setLoginPassword(e.target.value)}></input>
                <button id="login-button" onClick={handleLogin}>Log In</button>
                <hr id="divider"/>
                <p id="no-account">Don't have an account yet?</p>
                <button id="sign-up-button" onClick={toggleState}>Become a Showstopper</button>
            </div>
        )
    }
    const registerForm = () => {
        return (
            <div id="form">
                <input type="text" name="username" placeholder="Username" onChange={e => setRegisterUsername(e.target.value)}></input>
                <input type="password" name="password" placeholder="Password" onChange={e => setRegisterPassword(e.target.value)}></input>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={e => setRegisterConfirmPassword(e.target.value)}></input>
                <button id="login-button" onClick={handleRegister}>Sign Up</button>
                <button id="back-to-login" onClick={toggleState}>Back to login</button>
            </div>
        )
    }

    /* ----------------------------------- jsx ---------------------------------- */
    return (
        <div>
        <div id="container">
            <div id="title-and-phrase">
                <h1 className="rainbow" id="title">
                    Showstop
                </h1>
                <h2 id="phrase">
                    Your one-stop shop for keeping track of the shows 
                    you {currentWord}. 
                </h2>
            </div>
            <div id="form-container">
                {displayForm()}
            </div>
        </div>
        <div>
            <button onClick={getUser}>get user</button>
            {
                data ? <h1>{data.username}</h1> : null
            }
        </div>
        </div>
    );
}

export default Login;
