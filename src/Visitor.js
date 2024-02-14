import react from 'react';
import Profile from './Profile';
import Form  from './Form';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Visitor() {
    return (
        <>
        {cookies.get('token')?
            <Profile /> 
            :
            <Form />
        }
        </>
    )
}