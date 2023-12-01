
import React, {useState} from 'react'

export default function Proba1() {

    const [odgovor, setOdgovor] = useState([]);
    const [counter, setCounter] = useState(0);

    const [username, setUsername]  = useState('');
    const [password, setPassword]  = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        e.target.name == "username"? setUsername(value) : setPassword(value)
    }

    const register = async (e) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json' 
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        const res = await fetch('http://localhost:2000/register', options);
        const body = await res.json();
        /* console.log(`response od register fetcha: ${payload}`); */
        console.log(body);
    }

    const login = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
        const res = await fetch('http://localhost:2000/login', options);
        const login_message = await res.json();
        if(login_message.logged_in) {
            console.log(`You are logged in. You token is ${login_message.token}`);
            localStorage.setItem('token', login_message.token);
        } else {
            console.log(login_message.error_message);
        }
        
    }

    const sendRequest = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        const res = await fetch('http://localhost:2000/find', options);
        const data = await res.json();
        console.log(data)
        setOdgovor(data)
    }
    /* console.log('pozvana komponenta funkcija') */

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
                    name = "username"
                    type = "text"
                    value = {username}
                    onKeyDown={(e) => {if(e.key == 'Enter') register(e)}}
                    onChange = {handleChange}
                ></input>
                <span>Password</span>
                <input
                    className='password'
                    name = "password"
                    type = "text"
                    value = {password}
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
                        name = "username"
                        type = "text"
                        value = {username}
                        onKeyDown={(e) => {if(e.key == 'Enter') login(e)}}
                        onChange = {handleChange}
                    ></input>
                    <span>Password</span>
                    <input
                        className='password'
                        name = "password"
                        type = "text"
                        value = {password}
                        onKeyDown={(e) => {if(e.key == 'Enter') login(e)} }
                        onChange = {handleChange}
                    ></input>
                <button
                    onClick = {login}
                >login
                </button>
            </div>
            <button
                onClick = {sendRequest}
            >Send http request
            </button>
            <div>{odgovor.map((prom, i) => <li key = {i}>{prom.title}</li>)}</div>
        </div> 
    )
}
