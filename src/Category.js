import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles, getByCategory } from './getArticles';
import Calendar from './Calendar';
import './style/category.css';

export default function Category({ pageNum, setPageNum, sortArticles, title, tag }) {

    const {setShowCmsOverlay, listAllArticles, setListAllArticles, category, setCategory,
        shouldLoadArticles } = useContext(context);

    const [isDated, setIsDated] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleSelect = (e) => {
        const option = e.target.value;
        setCategory(option);
    }

    const handleClick = async (e) => {
        e.preventDefault();

        if (category === 'allArticles') {
            setShowCmsOverlay('flex');
            let allNews = await getAllArticles(pageNum, title, tag);
            setShowCmsOverlay('none');
            if(allNews == null) {
                allNews = []
            }
            if(isDated) {
                allNews = allNews.filter((article) => {
                    const articleYear = new Date(article.dateCreated).getFullYear();
                    const selectedYear = new Date(selectedDate).getFullYear();
                    const articleMonth = new Date(article.dateCreated).getMonth();
                    const selectedMonth = new Date(selectedDate).getMonth();
                    const articleDay = new Date(article.dateCreated).getDate();
                    const selectedDay = new Date(selectedDate).getDate();
                  
                    return articleYear === selectedYear && articleMonth === selectedMonth && articleDay === selectedDay
                })

            }
            const promiseResolveA = await setListAllArticles(allNews);
            
            sortArticles();
            //setPageNum(1)
        } else {
            setShowCmsOverlay('flex');
            let allNews = await getByCategory(category);
            setShowCmsOverlay('none');
    
            if(allNews == null) {
                allNews = []
            }
            if(isDated) {
                allNews = allNews.filter((article) => {
                    const articleYear = new Date(article.dateCreated).getFullYear();
                    const selectedYear = new Date(selectedDate).getFullYear();
                    const articleMonth = new Date(article.dateCreated).getMonth();
                    const selectedMonth = new Date(selectedDate).getMonth();
                    const articleDay = new Date(article.dateCreated).getDate();
                    const selectedDay = new Date(selectedDate).getDate();
                  
                    return articleYear === selectedYear && articleMonth === selectedMonth && articleDay === selectedDay
        

                })

            }
            const promiseResolveA = await setListAllArticles(allNews);
            sortArticles();
            //setPageNum(1);
        }
    }

    useEffect(async () => {
        if (category === 'allArticles') {
            setShowCmsOverlay('flex');
            let allNews = await getAllArticles(pageNum, title, tag);
            setShowCmsOverlay('none');
            if(allNews == null) {
                allNews = []
            }
            const promiseResolveA = await setListAllArticles(allNews);
            sortArticles();          
            //setPageNum(1)
        } else {
            setShowCmsOverlay('flex');
            let allNews = await getByCategory(category, pageNum);
            setShowCmsOverlay('none');
            if(allNews == null) {
                allNews = []
            }
            const promiseResolveA = await setListAllArticles(allNews);
            sortArticles();
            //setPageNum(1);
        }
    }, [pageNum])

    return (
        <div className="category">
            <Calendar setIsDated = {setIsDated} setSelectedDate = {setSelectedDate} />
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
            <div 
                className="category-button"
            >
                <button
                    className="category-button btn"
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