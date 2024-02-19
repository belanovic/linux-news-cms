import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles, getByCategory } from './getArticles';
import Calendar from './Calendar';
import './style/cathegory.css';

export default function Cathegory({ setPageNum, sortArticles }) {

    const {setShowCmsOverlay, listAllArticles, setListAllArticles, defaultCathegory, setDefaultCathegory,
        listLoaded, setListLoaded, shouldLoadArticles } = useContext(context);

    const [cathegory, setCathegory] = useState(defaultCathegory);
    const [isDated, setIsDated] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleSelect = (e) => {
        const option = e.target.value;
        console.log(option);
        setCathegory(option);
        setDefaultCathegory(option);
    }

    const handleClick = async (e) => {
        e.preventDefault();

        if (cathegory === 'allArticles') {
            let allNews = await getAllArticles();
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
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1)
        } else {
            let allNews = await getByCategory(cathegory);
    
            if(allNews == null) {
                console.log('evo meeeeeeeeeeeeeeeeeee')
                console.log(allNews)
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
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1);
        }
    }

    useEffect(async () => {
        if (cathegory === 'allArticles') {
            setShowCmsOverlay('block');
            let allNews = await getAllArticles();
            if(allNews == null) {
                allNews = []
            }
            const promiseResolveA = await setListAllArticles(allNews);
            sortArticles();
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1)
        } else {
            setShowCmsOverlay('block');
            let allNews = await getByCategory(cathegory);
            if(allNews == null) {
                allNews = []
            }
            const promiseResolveA = await setListAllArticles(allNews);
            sortArticles();
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1);
        }
    }, [])

    return (
        <div className="cathegory">
            <Calendar setIsDated = {setIsDated} setSelectedDate = {setSelectedDate} />
            <div className="cathegory-cathegories">
                {/* <label htmlFor="cathegory-cathegories">Rubrike</label> */}
                <select id="cathegory-cathegories" value={cathegory} onChange={handleSelect}>
                    <option value="allArticles">Sve vesti</option>
                    <option value="politics">Politics</option>  
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="sports">Sports</option>    
                </select>
            </div>   
            <div 
                className="cathegory-button"
            >
                <button
                    className="cathegory-button btn"
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