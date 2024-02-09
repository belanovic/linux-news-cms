import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AllArticles from './AllArticles.js';
import Article from './Article.js';
import { context } from './newsContext.js';
/* import Chat from './Chat';
import Call from './Call'; */
import './style/homepage.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default function Homepage() {

    const {setShowMenu, setNewArticleBtn, setShowFrontend, setShowCmsOverlay } = useContext(context);

    useEffect(() => {

        setNewArticleBtn('none');
        setShowMenu('none');
        setShowFrontend('block'); 
    })

    return (
        <div className="homepage">
          {/*   <Chat /> */}
            <div className="homepage-links">
                <div className="homepage-allArticlesBtn" onClick = {() => setShowCmsOverlay('block')}>
                    <Link to={`/allArticles`}>
                        <div
                            className="homepage-allArticlesBtn-text"
                        ><i className="fas fa-list-ul"></i>List of all articles</div>
                    </Link>
                </div>
                <div className="homepage-newArticleBtn">
                    <Link to="/oneArticle/new">
                        <div
                            className="homepage-newArticleBtn-text"
                        ><i className="fas fa-feather-alt"></i>Create new article</div>
                    </Link>
                </div>
                <div className="homepage-frontpage-order">
                    <Link to="/order">
                        <div
                            className="homepage-frontpage-order-text"
                        ><i className="fas fa-stream"></i>Set the frontpage</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}