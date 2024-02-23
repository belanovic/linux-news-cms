import React, { useState, useRef, useContext, useEffect } from 'react';
import Header from './Header';
import Homepage from './Homepage.js';
import AllArticles from './AllArticles.js';
import Article from './Article.js';
import Delete from './Delete.js';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { context } from './newsContext';
import Footer from './Footer'; 
import Form from './Form.js';
import Profile from './Profile';
import Visitor from './Visitor.js';
import Order from './Order.js';
import SearchDate from './SearchDate';
import Proba from './Proba.js';
import Proba1 from './Proba1.js';
///////  sss


export default function App() {

    const { showCmsOverlay, setShowCmsOverlay, isNewArticle, showHeader
             } = useContext(context)

    return (<>
            <div 
                className="cms"
            >
                <div className="cmsOverlay" style={{ display: showCmsOverlay }}><div className="loader"></div> </div>
                <Header showHomepageBtn={false} showFrontend={false} allArticlesBtn={false} newArticleBtn={false} />
              {/* <Proba /> */}
              {/* {<Proba1 />} */}
                <Switch>
                    <Route exact path="/"> 
                        <Homepage /> 
                    </Route>
                    <Route path="/visitor"><Visitor /></Route> 
                    <Route path="/order"><Order /></Route>
                    <Route path="/search-date"><SearchDate /></Route> 
                    <Route path='/allArticles'>  
                        <AllArticles />
                    </Route>

                    <Route path='/oneArticle/:id'>
                        <Article key = 'notNew' setShowCmsOverlay={setShowCmsOverlay} />
                    </Route>
                    <Route path='/oneArticleNew/:id'>
                        <Article key = 'new' setShowCmsOverlay={setShowCmsOverlay} />
                    </Route>
                    <Route path='/delete/:id'>
                        <Delete /> 
                    </Route>
                </Switch>
                <Footer />
            </div>
    </>
    )
}