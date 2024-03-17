import react, { useEffect, useState } from 'react';
import './style/query.css';

export default function Query({option, setTag, setTitle, tag, title}) {

    const [query, setQuery] = useState('');
 
    const handleChange = (e) => {
        const v = e.target.value;
        if(option === 'title') {
            setTitle(v);
        } else if(option === 'tag') {
            setTag(v)
        }
        setQuery(v);
    }

    useEffect(() => {

        if(option === 'title') {
            setQuery(title);
        } else if(option === 'tag') {
            setQuery(tag)
        }
    }, [])
 
    return (
        <div className="query">
            <input 
                className = "query-input"
                type = "text"
                value = {query}
                onChange = {handleChange}
                placeholder = {option == 'title'? "Pretraži naslove" : "Pretraži tagove"}
                >    
            </input>
        </div>
    )
}