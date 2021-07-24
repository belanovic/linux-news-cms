import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { context } from './newsContext.js';
import './style/header.css';

export default function Header() {
       const [showLinks, setShowLinks] = useState(false)
       const { showHomepageBtn, setAllArticlesBtn, allArticlesBtn, showOrderBtn,
            newArticleBtn, showFrontend, setFormVisible, 
            activeLink,showMenu,
            loggedIn, loggedUser, loggedUsername } = useContext(context);
       let displayLinks = showLinks === true? 'block' : 'none';
    return (
        <header className="header">
            <div className="header-links">
                <i  className= {showLinks === true? "fas fa-times" : "fas fa-bars"}
                    onClick = {() => {setShowLinks(prev => !prev)}}
                    style = {{display: showMenu}}     
                ></i>
                <div className="header-links-frontend" style = {{display: showFrontend}} >
                    <a href = 'https://site-news-frontend.netlify.app/' target = "_blanc">
                        <div className="header-links-frontend-title">
                            <i className="fab fa-react"></i>
                            <span>www.vesti.com</span>
                        </div>
                    </a> 
                </div>
                <div
                    className="header-homepageBtn"
                    style={{ display: showHomepageBtn && displayLinks }}
                >
                    <Link to="/">
                        <div
                            className="header-homepageBtn-text"
                        ><i className="fas fa-home"></i><span>Homepage</span></div>
                    </Link>
                </div>
 
                <div
                    className={`header-allArticlesBtn ${activeLink === 'allArticles' && 'activeLink'}`}
                    style={{ display: allArticlesBtn && displayLinks }}
                >
                    <Link to={`/allArticles`}>
                        <div
                            className="header-allArticlesBtn-text"
                        ><i className="fas fa-list-ul"></i><span>All articles</span></div>
                    </Link>
                </div>
                <div
                    className={`header-orderBtn ${activeLink === 'order' && 'activeLink'}`}
                    style={{ display: showOrderBtn && displayLinks }}
                >
                    <Link to={`/order`}>
                        <div
                            className="header-orderBtn-text"
                        ><i className="fas fa-stream"></i><span>Order articles</span></div>
                    </Link>
                </div>
            </div>

            <div className="header-title">
                <Link to="/">
                        <div
                            className="header-title-text"
                        >CMS</div>
                </Link>
            </div>

            <div className = "right-box">
                <div
                    className={`header-newArticleBtn ${activeLink === 'article' && 'activeLink'}`}
                    style={{ display: newArticleBtn }}
                >
                    <Link to="/oneArticleNew/new">
                        <div
                            className="header-newArticleBtn-text"
                        ><i className="fas fa-feather-alt"></i><span>New article</span></div>
                    </Link>
                </div>
                <div className="login">
                    <Link to = "/form"><i className="fas fa-user-edit" onClick = {() => setFormVisible(prev => !prev)}></i></Link>
                    <div className = "login-info">
                        <div className = "login-info-title">User logged in:</div>
                        <div className = "login-info-username">{loggedUser.username === ''? loggedUser.username : localStorage.getItem('loggedUsername')}</div>
                    </div>
                </div>
            </div>

        </header>
    )
}