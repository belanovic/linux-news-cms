
import React, {useState, useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';

export default function Proba1() {

    const [odgovor, setOdgovor] = useState([]);
    const [counter, setCounter] = useState(0);

    const [usernameRegister, setUsernameRegister]  = useState('');
    const [passwordRegister, setPasswordRegister]  = useState('');

    const [usernameLogin, setUsernameLogin]  = useState('');
    const [passwordLogin, setPasswordLogin]  = useState('');

    const [loggedIn, setLoggedIn] = useState(false);
    

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        if(name == 'usernameRegister') setUsernameRegister(value)
        if(name == 'passwordRegister') setPasswordRegister(value)
        if(name == 'usernameLogin') setUsernameLogin(value)
        if(name == 'passwordLogin') setPasswordLogin(value)
    }



    const sendRequest = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + /* 'sldfsdfsdfsdfsf' */ localStorage.getItem('token')
            }
        }
        let res_body;
        try {
            const res = await fetch('http://localhost:2000/find', options);
            res_body = await res.json();
            if(res_body.error) {
                alert(res_body.error.message)
                return
            }
            setOdgovor(res_body);
        } catch (error) {
            alert(error.message);
        }
    }
    const register = async (e) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json' 
            },
            body: JSON.stringify({
                username: usernameRegister,
                password: passwordRegister
            })
        }
        const res = await fetch('http://localhost:2000/register', options);
        const body = await res.json();
        /* alert('You are registered as ' + body.username); */
        alert(body);
    }

    const login = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: usernameLogin,
                password: passwordLogin
            })
        };
        const res = await fetch('http://localhost:2000/login', options);
        const login_message = await res.json();
        if(login_message.logged_in) {
            alert(`You are logged in as ${login_message.username}. You token is ${login_message.token}`);
            localStorage.setItem('token', login_message.token);
            setLoggedIn(true);
            setUsernameLogin('');
            setPasswordLogin('');
        } else {
            alert(login_message.error_message);
        }
        
    }
    const logout = () => {
        const removed = localStorage.removeItem('token');
        setLoggedIn(false);
        setOdgovor([])
    }

    /* console.log('pozvana komponenta funkcija') */
    
    useEffect(() => {
        localStorage.getItem('token')? setLoggedIn(true) : setLoggedIn(false)
    }, [])

    return (
        <div className = "proba1" style = {{
            color: "white",
            background: "black"
        }}>
            <h1>Proba1</h1>
            <div className='register'>
                <span>Username</span>
                <input
                    className = "username"
                    name = "usernameRegister"
                    type = "text"
                    value = {usernameRegister}
                    onKeyDown={(e) => {if(e.key == 'Enter') register(e)}}
                    onChange = {handleChange}
                ></input>
                <span>Password</span>
                <input
                    className='password'
                    name = "passwordRegister"
                    type = "text"
                    value = {passwordRegister}
                    onKeyDown={(e) => {if(e.key == 'Enter') register(e)} }
                    onChange = {handleChange}
                ></input>
            <button
                onClick = {register}
            >Register
            </button>
                </div>
                <div className='login'>
                    <span>Username</span>
                    <input
                        className = "username"
                        name = "usernameLogin"
                        type = "text"
                        value = {usernameLogin}
                        onKeyDown={(e) => {if(e.key == 'Enter') login(e)}}
                        onChange = {handleChange}
                    ></input>
                    <span>Password</span>
                    <input
                        className='password'
                        name = "passwordLogin"
                        type = "text"
                        value = {passwordLogin}
                        onKeyDown={(e) => {if(e.key == 'Enter') login(e)} }
                        onChange = {handleChange}
                    ></input>
                <button
                    onClick = {() => loggedIn? logout() : login()}
                >{loggedIn? 'logout' : 'login'}
                </button>
                {loggedIn?
                <span>{jwtDecode(localStorage.getItem('token')).username}</span>
                :
                ''
                }
            </div>
            {loggedIn?
            <div>
                <button
                    onClick = {sendRequest}
                >Send http request
                </button>
                <div>{odgovor.map((prom, i) => <li key = {i}>{prom.title}</li>)}</div>
            </div>
            :
            ''
            }

            
        </div> 
    )
}
