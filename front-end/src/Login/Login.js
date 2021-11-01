import {React, useEffect, useState} from 'react';
import './Login.css';
import { Redirect } from "react-router-dom"
import axios from 'axios';

const Login = (props) => {
    const [user, setUser] = [props.user, props.setUser];
    
    useEffect(() => {
        document.title = "Showstop";
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    /* ------------------------ rotating through wordbank ----------------------- */
    const wordBank = ['watch','will watch','watched']
    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(wordBank[index]);
    useEffect(() => {
        setCurrentWord(wordBank[index])
    }, [index]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        const ticks = setTimeout(() => {
            setIndex(index === wordBank.length - 1 ? 0 : index + 1)       
        }, 2000);
        return () => {
            clearTimeout(ticks);
          };
    }, [currentWord]); // eslint-disable-line react-hooks/exhaustive-deps

    /* ---------------------- registration and login states --------------------- */
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState(null);
    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/user"
        }).then(res => {
            setUser(res.data);
        });
    }
    const handleLogin = async () => {
        await axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/login"
        }).then(res => {
            console.log('logged in as', res);
        });
        getUser();
    }
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const validateRegistration = (username, password, confirmPassword) => {
        if (username.length < 3) {
            setError("Username length should be at least 3.");
            return false;
        }
        else if (!usernameRegex.exec(username)) {
            setError("Username should be alphanumeric.");
            return false;
        }
        else if(password !== confirmPassword) {
            setError("Passwords don't match.");
            return false;
        }
        else if(password.length < 8) {
            setError("Password length should be at least 8.")
            return false;
        }
        return true;
    }
    const handleRegister = async () => {
        if (validateRegistration(registerUsername, registerPassword, registerConfirmPassword)) {
            await axios({
                method: "POST",
                data: {
                    username: registerUsername,
                    password: registerPassword,
                },
                withCredentials: true,
                url: "http://localhost:4000/register"
            }).then(res => {
                console.log('registered as', res);
            });
            getUser();
        }
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
                { error && <p id="error" className="animate-flicker">{error}</p>}
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
                { error && <p id="error" className="animate-flicker">{error}</p>}
                <input type="text" name="username" placeholder="Username" onChange={e => setRegisterUsername(e.target.value)}></input>
                <input type="password" name="password" placeholder="Password" onChange={e => setRegisterPassword(e.target.value)}></input>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={e => setRegisterConfirmPassword(e.target.value)}></input>
                <button id="login-button" onClick={handleRegister}>Sign Up</button>
                <button id="back-to-login" onClick={toggleState}>Back to login</button>
            </div>
        )
    }

    useEffect(() => {
        if(!user) {
            getUser();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    /* -------------------- importing typewriter text script -------------------- */
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "./scripts/Typewriter.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        }
      }, []);

    /* ----------------------------------- jsx ---------------------------------- */
    if(!user) {
        return (
            <div id="container">
                <div id="title-and-phrase">
                    <h1 className="rainbow" id="title">
                        Showstop
                    </h1>
                    <h2 id="phrase">
                        Your one-stop shop for keeping track of the shows 
                        you <span id="typewriter-text"></span><div id="cursor"></div>
                    </h2>
                </div>
                <div id="form-container">
                    {displayForm()}
                </div>
            </div>
        );
    }
    else return <Redirect to="/list" />;
}

export default Login;
