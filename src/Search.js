import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles, getArticle } from './getArticles.js';
import Query from './Query.js';
import Category from './Category.js';
import Calendar from './Calendar.js';
import './style/search.css';

export default function Search({pageArticles, pageNum, setPageNum, sortArticles, title, tag, setTitle, setTag, searchVisible }) {

    const {category} = useContext(context);

    const [isDated, setIsDated] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleClick = async (e) => {
            e.preventDefault();
            const done = await pageArticles(category, 1, title, tag);
            if(done == null) return;
            setPageNum({number: 1, isLast: false});

        /*  if(isDated) {
            allNews = allNews.filter((article) => {
                const articleYear = new Date(article.dateCreated).getFullYear();
                const selectedYear = new Date(selectedDate).getFullYear();
                const articleMonth = new Date(article.dateCreated).getMonth();
                const selectedMonth = new Date(selectedDate).getMonth();
                const articleDay = new Date(article.dateCreated).getDate();
                const selectedDay = new Date(selectedDate).getDate();
                
                return articleYear === selectedYear && articleMonth === selectedMonth && articleDay === selectedDay
            })

        } */
    }

    return (
        
            <div className = {`search ${searchVisible && 'show'}`}>
                <Query option = "title" setTag = {setTag} setTitle = {setTitle} />
                <Query option = "tag" setTag = {setTag} setTitle = {setTitle} />
                <Category 
                    pageArticles = {pageArticles} 
                    pageNum = {pageNum} 
                    setPageNum = {setPageNum} 
                    sortArticles = {sortArticles} 
                    title = {title} 
                    tag = {tag} 
                    setTitle = {setTitle} 
                    setTag = {setTag} 
                />
                <Calendar setIsDated = {setIsDated} setSelectedDate = {setSelectedDate} />
                <div 
                    className="search-button"
                >
                    <button
                        className="search-button btn"
                        onClick={(e) => {
                            handleClick(e);
                        }}
                    >Prikaži
                    </button>
                    <i 
                        className="fas fa-search"
                        onClick={(e) => {
                            handleClick(e);
                        }}
                    ></i>
                </div>
            </div>

    )
}