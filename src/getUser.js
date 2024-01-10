import HOST_BACKEND from './hostBackend.js';

export async function registerUser(firstName, lastName, usernameSignUp, passwordSignUp, email, profileImgNameLarge, profileImgURLLarge, profileImgURLSmall, profileImgNameSmall) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: usernameSignUp,
            password: passwordSignUp,
            email: email,
            profileImgNameLarge: profileImgNameLarge,
            profileImgURLLarge: profileImgURLLarge,
            profileImgURLSmall: profileImgURLSmall,
            profileImgNameSmall: profileImgNameSmall
        })
    }
    try {
        const response = await fetch(`${HOST_BACKEND}/register`, options)
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null
        }
        if(responseBody.registrationMsg){
            return responseBody.registrationMsg;
        }
        return null
    }
    catch (error) {
        alert(error.message);
        return null
    }
}

export async function loginUser(usernameSignIn, passwordSignIn) {
    try {
        const response = await fetch(`${HOST_BACKEND}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: usernameSignIn,
                password: passwordSignIn
            })
        })
        const responseBody = await response.json();
        
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null
        }

        if(responseBody.loginMsg) {
            return responseBody.loginMsg
        }
        return responseBody
    }
    catch (error) {
        console.log(error);
        return null
    }
}

export async function updateProfileImg(usernameSignIn, loggedEmail, profileImgURL, profileImgName, size ) {
   /*  console.log(usernameSignIn, passwordSignIn, profileImgURL, profileImgName);
    return */

    let body;

    if(size === 'large') {
        body = JSON.stringify({
            username: usernameSignIn,
            email: loggedEmail,
            profileImgURLLarge: profileImgURL,
            profileImgNameLarge: profileImgName
        })
    } else if(size === 'small') {
        body = JSON.stringify({
            username: usernameSignIn,
            email: loggedEmail,
            profileImgURLSmall: profileImgURL,
            profileImgNameSmall: profileImgName
    
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/updateProfilePhotoURL/${size}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token')
            },

            body: body
        })
        const user = await response.json();
     
        return user
    }
    catch (err) {
        console.log(err);
    }
}