
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
    
    const [query, setQuery] = useState('');
    const [film, setFilm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        if(name == 'usernameRegister') setUsernameRegister(value)
        if(name == 'passwordRegister') setPasswordRegister(value)
        if(name == 'usernameLogin') setUsernameLogin(value)
        if(name == 'passwordLogin') setPasswordLogin(value)
        if(name == 'query') setQuery(value)
    }

    const searchFilm = async () => {
        const options = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                title: query
            })
        }
        try {
            const res = await fetch('http://localhost:2000/findFilm', options);
            if(res.status == 401) {
                alert('401 - Authentication error');
                logout();
                return
            }
            let res_body = await res.json();
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
            if(res_body.login_msg.logged_in == false) {
                alert(res_body.login_msg.failure_msg);
                return
            }
            alert(`You are logged in as ${res_body.login_msg.username}`);
            setLoggedIn(true);
            setUsernameLogin('');
            setPasswordLogin('');
        } catch (error) { 
            alert(error.message)
        }
        
        
    }
    const logout = () => {
        const removed = cookies.remove('token', {sameSite: true});
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
                <input
                    className = "query"
                    name = "query"
                    type = "text"
                    value = {query}
                    onChange= {handleChange}
                    onKeyDown={(e) => {if(e.key == 'Enter') searchFilm(e)}}

                ></input>
                <button
                    onClick = {searchFilm}
                >Search Film
                </button>
                <div>{odgovor.map((prom, i) => <li key = {i}>{prom.title}</li>)}</div>
            </div>
            :
            ''
            }

            
        </div> 
    )
}
