
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

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');


    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        if(name == 'usernameRegister') setUsernameRegister(value)
        if(name == 'passwordRegister') setPasswordRegister(value)
        if(name == 'usernameLogin') setUsernameLogin(value)
        if(name == 'passwordLogin') setPasswordLogin(value)
        if(name == 'queryInput') setQuery(value)
        if(name == 'titleInput') setTitle(value)
        if(name == 'genreInput') setGenre(value)
        if(name == 'yearInput') setYear(value)
    }

    const searchFilm = async () => {
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
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
            let resBody = await res.json();
            if(resBody.error) {
                alert(resBody.error.message)
                return
            }
            if(!resBody.queryMsg.isSuccess) {
                alert(resBody.queryMsg.failureMsg)
                return
            }
            setOdgovor([resBody.queryMsg.filmFound]);
            setQuery('')
        } catch (error) {
            alert(error.message);
        }
    }

    const getAllFilms = async () => {
        const options = {
            method: 'GET',
            credentials: 'include'
        }
        const res = await fetch('http://localhost:2000/allFilms', options);
        if(res.status == 401) {
            alert('401 - Authentication error');
            logout();
            return
        }
        const resBody = await res.json();

        if(resBody.error) {
            alert(resBody.error.message);
            return
        }
        if(resBody.queryMsg.isSuccess == false) {
            alert(resBody.queryMsg.failureMsg);
            return
        }
        setOdgovor(resBody.queryMsg.filmsFound)
    }

    const postFilm = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                genre: 'action',
                year: 1994
            })
        }
        try {
            const res = await fetch('http://localhost:2000/postFilm', options);
            if(res.status == 401) {
                alert('401 - Authentication error');
                logout();
                return
            }

            const resBody = await res.json();

            if(resBody.error) {
                alert(resBody.error.message)
                return
            }
            if(resBody.postMsg.isSaved == false) {
                alert(resBody.postMsg.failureMsg);
                return
            }
            alert(`The film ${resBody.postMsg.filmSaved.title} is saved in the database`);
        } catch (error) {
            alert(error.message)
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
            const resBody = await res.json();
            if(resBody.error) {
                alert(resBody.error.message);
                return
            }
            if(resBody.registration_msg.registered == false) {
                alert(resBody.registration_msg.failureMsg);
                return
            }
            alert('You are registered as ' + resBody.registration_msg.username);
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
            const resBody = await res.json();
            if(resBody.error) {
                alert(resBody.error.message);
                return
            }
            if(resBody.login_msg.logged_in == false) {
                alert(resBody.login_msg.failureMsg);
                return
            }
            alert(`You are logged in as ${resBody.login_msg.username}`);
            setLoggedIn(true);
            setUsernameLogin('');
            setPasswordLogin('');
        } catch (error) { 
            alert(error.message)
        }
        
        
    }
    const logout = () => {
        const removed = cookies.remove('token', {sameSite: true, secure: true});
        setLoggedIn(false);
        setUsernameLogin('');
        setPasswordLogin('');
        setOdgovor([]);
        setTitle('')
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
           
            <div
                className='visitor'
            >
                {
                loggedIn?
                <div 
                    className='user'
                >
                    <div
                        className='logout'
                    >
                        <button
                            onClick = {logout}
                        >logout
                        </button>
                        <span>{jwtDecode(cookies.get('token')).username}</span>
                    </div>
                </div>
                    :
                <div
                    className='guest'
                >
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
                            onClick = {login}
                        >login
                        </button>
                    </div>
                </div>
                }
            </div>
            {
            loggedIn?
            <div
                className = "query"
            >
                <input
                    className = "queryInput"
                    name = "queryInput"
                    type = "text"
                    value = {query}
                    onChange= {handleChange}
                    onKeyDown={(e) => {if(e.key == 'Enter') searchFilm(e)}}

                ></input>
               <button
                    onClick = {searchFilm}
                    >Search Film
                </button>
               <button
                    onClick = {getAllFilms}
                    >Get all films
                </button>
                <div>{odgovor.map((prom, i) => <li key = {i}>{`${prom.title} is an ${prom.genre} film, released in the year ${prom.year}`}</li>)}</div>

            </div>
            :
            ''
            }
            {
            loggedIn?
            <div
                className='post'
            >   
                <div
                    className = 'postInput'
                >     <label>Title</label>
                      <input
                        className = 'titleInput'
                        name = 'titleInput'
                        value = {title}
                        onChange = {handleChange} 
                        onKeyDown={(e) => {if(e.key == 'Enter') postFilm(e)}}
                    ></input>
                    <label>Genre</label>
                    <input
                        className = 'genreInput'
                        name = 'genreInput'
                        value = {genre}
                        onChange={handleChange}
                        onKeyDown={(e) => {if(e.key == 'Enter') postFilm(e)}}
                    ></input>
                    <label>Year</label>
                    <input
                        className = 'yearInput'
                        name = 'yearInput'
                        value = {year}
                        onChange={handleChange}
                        onKeyDown={(e) => {if(e.key == 'Enter') postFilm(e)}}
                    ></input>
                </div>
                <button
                    className = 'postBtn'
                    onClick={postFilm}
                >Post film
                </button>
            </div>
            :
            ''
            }
        </div> 
    )
}
