import {React, useEffect, useState} from 'react';
import '../css/Login.css';
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
    const api = "http://localhost:4000";
    const [loginError, setLoginError] = useState(null);
    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: (api + "/user")
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
            url: (api + "/login")
        }).then(res => {
            if(res.data) {
                console.log("Successfully authenticated.");
            } else {
                console.log("Authentication unsuccessful.");
                setLoginError("No such user/password combo exists.")
            }
        });
        getUser();
    }
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const regConditions = [
        {message: 'Username contains only alphanumeric characters', satisfied: (usernameRegex.exec(registerUsername))},
        {message: 'Username is at least 3 characters long', satisfied: (registerUsername.length >= 3)},
        {message: 'Password is between 8 and 128 characters long', satisfied: (registerPassword.length >= 8 && registerPassword.length <= 128)},
        {message: 'Passwords match', satisfied: (registerPassword.length > 0 && registerPassword === registerConfirmPassword)}
    ];
    const validateRegistration = () => {
        return regConditions.reduce((valid, condition) => valid && condition.satisfied, true);
    }
    const handleRegister = async () => {
        if (validateRegistration()) {
            await axios({
                method: "POST",
                data: {
                    username: registerUsername,
                    password: registerPassword,
                },
                withCredentials: true,
                url: (api) + "/register"
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
                { loginError && <p id="error" className="animate-flicker">{loginError}</p>}
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
                {/* &#10006; cross, &#x2714; check */}
                <div id="reg-conditions">{regConditions.map((condition, i) => 
                    <p className="reg-condition" style={condition.satisfied ? {"color":"black"} : {"color":"gray"}} key={i}>{
                        condition.satisfied ? <span className="check">&#x2714;</span> : <span className="X">&#10006;</span>
                        } {condition.message}
                    </p>
                )}</div>
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