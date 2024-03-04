import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles } from './getArticles';
import './style/search.css';

export default function Search({option, setTag, setTitle}) {

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
 
    return (
        <div className="search">
            <input 
                className = "search-input"
                type = "text"
                value = {query}
                onChange = {handleChange}
                placeholder = {option == 'title'? "Pretraži naslove" : "Pretraži tagove"}
                >    
            </input>
        </div>
    )
}