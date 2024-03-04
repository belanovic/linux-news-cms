import React, { useContext, useEffect } from 'react';
import PaginationButton from './Pagination-button';
import { context } from './newsContext';
import './style/pagination.css';

export default function Pagination({ pageNum, setPageNum, isLastPage }) {
    const { listAllArticles } = useContext(context);
    const numOfPages = Math.ceil(listAllArticles.length / 10)

    const increasePageNum = () => {
        setPageNum((prev) => {
            return prev + 1
        })
    }
    const decreasePageNum = () => {
        setPageNum((prev) => {
            if (prev === 1) return prev;
            return prev - 1
        })
    }

    const firstPageNum = () => {
        setPageNum(1)
    }
    const lastPageNum = () => {
        setPageNum(numOfPages);
    }

/*     const generateNumButtons = () => {
        let list = [];
        for (let i = 1; i <=numOfPages; i++) {
            list.push(<PaginationButton key={i} sign={i} setPageNum={setPageNum} currentBtn={pageNum === i} />)
        }
        let shortList = list.slice(pageNum - 1 - 1, pageNum  + 1);
        if (pageNum === 1) shortList.unshift(list[0])
        return shortList;
    } */

    return (
        <div className="pagination">
            
                <PaginationButton 
                    sign= {<i className="fas fa-fast-backward"></i>}
                    clickHandler = {firstPageNum} 
                />   
                <PaginationButton
                    sign= {<i className="fas fa-chevron-left"></i>}
                    pageNum={pageNum}
                    clickHandler={decreasePageNum}
                />

                <PaginationButton sign = {pageNum} setPageNum={setPageNum}/>
         
                <PaginationButton
                    sign= {<i className="fas fa-chevron-right"></i>}
                    pageNum={pageNum}
                    clickHandler={increasePageNum}
                />
             
                <PaginationButton 
                    sign = {<i className="fas fa-fast-forward"></i>}
                    clickHandler = {lastPageNum}
            />
        </div>
    )
}