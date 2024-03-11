import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles, getArticle } from './getArticles.js';
import Calendar from './Calendar.js';
import './style/category.css';

export default function Category({pageArticles, pageNum, setPageNum, sortArticles, title, tag, setTitle, setTag }) {

    const {setShowCmsOverlay, listAllArticles, setListAllArticles, category, setCategory,
        shouldLoadArticles } = useContext(context);

    const [isDated, setIsDated] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleSelect = (e) => {
            const option = e.target.value;
            setCategory(option);
    }


    return (
        <div className="category">
            <div className="category-categories">
                {/* <label htmlFor="category-categories">Rubrike</label> */}
                <select id="category-categories" value={category} onChange={handleSelect}>
                    <option value="allArticles">Sve vesti</option>
                    <option value="politics">Politics</option>  
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="sports">Sports</option>    
                </select>
            </div>   
        </div>
    )
}