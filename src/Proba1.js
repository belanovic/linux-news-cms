import React, {useState} from 'react'

export default function Proba1() {

    const [odgovor, setOdgovor] = useState([]);
    const [counter, setCounter] = useState(0)

    const sendRequest = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer fsdfsadwerqwrsdsdcsdfsdrfwefsdfsdgsdg'
            }
        }
        const res = await fetch('http://localhost:2000/find', options);
        const data = await res.json();
        console.log(data)
        setOdgovor(data)
    }
    console.log('pozvana komponenta funkcija')

    return (
        <div className = "proba1" style = {{
            color: "white",
            background: "black"
        }}>
            <h1>Proba1</h1>
            <button
                onClick = {sendRequest}
            >Send http request
            </button>
            <div>{odgovor.map((prom, i) => <li key = {i}>{prom.title}</li>)}</div>
        </div> 
    )
}