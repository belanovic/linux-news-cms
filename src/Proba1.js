
import React, {useState, useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'universal-cookie'
const cookies = new Cookies();

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
            credentials: 'include'
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
        try {
            const res = await fetch('http://localhost:2000/register', options);
            const res_body = await res.json();
            if(res_body.error) {
                alert(res_body.error.message);
                return
            }
            if(res_body.registration_msg.registered == false) {
                alert(res_body.registration_msg.failure_msg);
                return
            }
            alert('You are registered as ' + res_body.registration_msg.username);
            return
            
        } catch (error) {
            alert(error.message)
        }
    }

    const login = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ 
                username: usernameLogin,
                password: passwordLogin
            })
        };
        try {
            const res = await fetch('http://localhost:2000/login', options);
            const res_body = await res.json();
            if(res_body.error) {
                alert(res_body.error.message);
                return
            }
            if(res_body.login_msg.logged_in) {
                alert(`You are logged in as ${res_body.login_msg.username}. You token is ${res_body.login_msg.token}`);
                console.log(cookies.get('token'));
                setLoggedIn(true);
                setUsernameLogin('');
                setPasswordLogin('');
            } else {
                alert(res_body.login_msg.failure_msg);
            }
        } catch (error) {
            alert(error.message)
        }
        
        
    }
    const logout = () => {
        const removed = cookies.remove('token');
        setLoggedIn(false);
        setUsernameLogin('');
        setPasswordLogin('');
        setOdgovor([])
    }

    /* console.log('pozvana komponenta funkcija') */
    
    useEffect(() => {
        cookies.get('token')? setLoggedIn(true) : setLoggedIn(false)
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
                <span>{jwtDecode(cookies.get('token')).username}</span>
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
