import HOST_BACKEND from './hostBackend.js';

export async function getAllArticles() {

    const options = { 
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/allArticles`, options);
           /*      if(response.status == 401) {
            alert('401 - Authentication error');
            logout();
            return
        } */
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null
        }
        return responseBody
    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function getArticle(id) {

    const options = { 
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticleCMS/${id}`, options);
        /*      if(response.status == 401) {
            alert('401 - Authentication error');
            logout();
            return
        } */
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.articleFound) {
            return responseBody.articleFound;
        }
    }
    catch(error) {
        alert(error.message)
        return null;
    }
}
export async function postArticle({id, title, subtitle, text, paragraphs, note, imgURL, imgName, 
                                tagsArr, imgURL2, imgName2, imgFilter, imgFilter2,
                                dateUpdated, dateCreated, datePublished, videoURL, videoName,
                                category, position, published, videoDescription, imgDescription, author, source}) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            /* 'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token') */
        },
        credentials: 'include',
        body: JSON.stringify({
            title: title,
            subtitle: subtitle,
            text: text,
            paragraphs: paragraphs,
            note: note,
            imgURL: imgURL,
            imgName: imgName,
            imgURL2: imgURL2,
            imgName2: imgName2,
            imgFilter: imgFilter,
            imgFilter2: imgFilter2,
            videoURL: videoURL,
            videoName: videoName,
            dateUpdated: dateUpdated,
            dateCreated: dateCreated,
            datePublished: datePublished,
            category: category,
            position: position,
            published: published,
            imgDescription: imgDescription,
            videogDescription: videoDescription,
            source: source,
            author: author,
            tagsArr: tagsArr

        })
    }                               

    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticle/`, options);
        /*      if(response.status == 401) {
            alert('401 - Authentication error');
            logout();
            return
        } */
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.savedArticle) {
            return responseBody.savedArticle;
        }
    }
    catch (error) {
        alert(error.message)
        return null; 
    }
}

export async function updateArticle({id, title, subtitle, text, paragraphs, note, imgURL2, imgName2,
                                    imgURL, imgName, imgFilter, imgFilter2, videoURL, videoName, position, 
                                    category, published, datePublished, tagsArr,
                                    imgDescription, videoDescription, author, source}) {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            /* 'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token') */
        },
        credentials: 'include',
        body: JSON.stringify({
            title: title,
            subtitle: subtitle,
            text: text,
            paragraphs: paragraphs,
            note: note,
            imgURL: imgURL,
            imgName: imgName,
            imgURL2: imgURL2,
            imgName2: imgName2,
            imgFilter: imgFilter,
            imgFilter2: imgFilter2,
            videoURL: videoURL,
            videoName: videoName,
            dateUpdated: Date(),
            datePublished: datePublished,
            category: category,
            position: position,
            published: published,
            imgDescription: imgDescription,
            videoDescription: videoDescription,
            source: source,
            author: author, 
            tagsArr: tagsArr
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticle/${id}`, options)
        const responseBody = await response.json();

        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }

        if(responseBody.updateMsg) {
            return responseBody.updateMsg;
        }

    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function deleteArticle(id) {

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            /* 'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token') */
        },
        credentials: 'include'
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticle/${id}`, options)
        const responseBody = await response.json();
        
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.articleDeleted) {
            return responseBody.articleDeleted;
        }
    }
    catch (error) {
        alert(error.message)
        return null;
    }
}

export async function getFrontpageNews() {

    const options = { 
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/frontpageArticlesCMS`, options);
        const responseBody = await response.json();

        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.articles) {
            return responseBody.articles;
        }
        alert('Problem sa listom članaka')
        return null
    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function updateArticlePosition(id, position) {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            /* 'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token') */
        },
        credentials: 'include',
        body: JSON.stringify({
            position: position
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/articlePosition/${id}`, options);
        const responseBody = await response.json();
        
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.updatedArticle) {
            return responseBody.updatedArticle;
        }
        alert('Problem sa promenom pozicije članka')
        return null
    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function updateFrontpage(idAndPositionArr) {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            /* 'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token') */
        },
        credentials: 'include',
        body: JSON.stringify({
            idAndPositionArr: idAndPositionArr
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/updateFrontpage`, options);
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.modifiedAllArticles) {
            return responseBody.modifiedAllArticles;
        }
        alert('Problem sa promenom naslovne strane')
        return null
    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function getByCategory(category) {

    const options = {
        headers: {
            'Content-Type': 'application/json',
            /* 'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token') */
        },
        credentials: 'include'
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/category/${category}`, options);
        const responseBody = await response.json();
        
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.newsByCategory) {
            return responseBody.newsByCategory;
        }
        alert('Problem sa pretragom vesti po kategorijama')
        return null
    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function getByDate(date) {
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            /* 'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token') */
        },
        credentials: 'include',
        body: JSON.stringify({
            day: date.day,
            month: date.month,
            year: date.year
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/articlesByDate`, options)
        const responseBody = await response.json();

        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }

        if(responseBody.newsByDateMsg) {
            return responseBody.newsByDateMsg
        }
        alert('Problem sa pretragom vesti po datumu')
        return null

    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function publishArticle(id) {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            /* 'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token') */
        },
        credentials: 'include',
        body: JSON.stringify({
            published: true,
            datePublished: Date(), 
            dateUpdated: Date()
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/publishArticle/${id}`, options);
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.publishedArticle) {
            return responseBody.publishedArticle
        }
        alert('Problem sa objavom vesti')
        return null
    }
    catch (error) {
        alert(error.message)
        return null
    }
}
export async function scrape(url) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            /* 'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token') */
        },
        credentials: 'include',
        body: JSON.stringify({
            url: url
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/scraper`, options)
        const responseBody = await response.json();
      
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.scrapedArticle) {
            return responseBody.scrapedArticle
        }
        alert('Problem sa skidanjem teksta')
        return null
    }
    catch (error) {
        alert(error.message)
        return null
    }
}
 
export async function publishTwit(twit) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            /* 'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token') */
        },
        credentials: 'include',
        body: JSON.stringify({
            twit: twit
        })
    }
    try {
        const response = await fetch(`${HOST_BACKEND}/publishTwit`, options)
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.responseTwitt) {
            return responseBody.responseTwitt
        }
        alert('Problem sa objavom tvita')
        return null
    } catch (error) {
        alert(error.message)
        return null
    }
}