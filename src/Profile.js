import react, { useContext, useEffect, useState } from 'react';
import {context} from './newsContext';
import './style/profile.css';
import Form from './Form.js';
import ChooseImage from './ChooseImage.js';
import {uploadImageDB, removeImageDB} from './handleImageDB.js';
import {updateProfileImg} from './getUser';
import io from 'socket.io-client';
import HOST_CALL from './hostCall.js';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const socket = io(HOST_CALL);

export default function Profile() {

    const {setNewArticleBtn, showCmsOverlay, setShowCmsOverlay,setShowFrontend, setShowMenu} = useContext(context);

    const [deployedImgNameLarge, setDeployedImgNameLarge] = useState('');
    const [profileImgNameLarge, setProfileImgNameLarge] = useState('');
    const [profileImgURLLarge, setProfileImgURLLarge] = useState('');
    const [profileImgFileLarge, setprofileImgFileLarge] = useState('');

    const [deployedImgNameSmall, setDeployedImgNameSmall] = useState('');
    const [profileImgNameSmall, setProfileImgNameSmall] = useState('');
    const [profileImgURLSmall, setProfileImgURLSmall] = useState('');
    const [profileImgFileSmall, setprofileImgFileSmall] = useState('');

    const handleSave = async () => {

        setShowCmsOverlay('flex');

        let updatedUser;
        let photoURLLarge;
        let photoURLSmall;

        if(profileImgURLLarge === 'generic') { 
            photoURLLarge = 'generic';
            let updateMsg = await updateProfileImg(localStorage.getItem('loggedUsername'), localStorage.getItem('loggedEmail'), photoURLLarge, profileImgNameLarge, 'large' )
            updatedUser = updateMsg.userUpdated;
            if(deployedImgNameLarge !== 'generic') {
                const deletionMsg = await removeImageDB(deployedImgNameLarge, 'profile/');
            }
            
        } else { 
            photoURLLarge = await uploadImageDB(profileImgNameLarge, profileImgFileLarge, 'profile/');
            let updateMsg = await updateProfileImg(localStorage.getItem('loggedUsername'), localStorage.getItem('loggedEmail'), photoURLLarge, profileImgNameLarge, 'large'  )
            updatedUser = updateMsg.userUpdated;
            if(deployedImgNameLarge !== 'generic') {

                const deletionMsg = await removeImageDB(deployedImgNameLarge, 'profile/');
            }
            /* localStorage.setItem('deployedImgNameLarge', updatedUser.profileImgNameLarge); */
            setDeployedImgNameLarge(updatedUser.profileImgNameLarge);

            localStorage.setItem('profileImgURLLarge', updatedUser.profileImgURLLarge);
            setProfileImgURLLarge(localStorage.getItem('profileImgURLLarge'));
            localStorage.setItem('profileImgNameLarge', updatedUser.profileImgNameLarge);
            setProfileImgNameLarge(localStorage.getItem('profileImgNameLarge'));
        }


        if(profileImgURLSmall === 'generic') {
            photoURLSmall = 'generic';
            let updateMsg = await updateProfileImg(localStorage.getItem('loggedUsername'), localStorage.getItem('loggedEmail'), photoURLSmall, profileImgNameSmall, 'small' )
            updatedUser = updateMsg.userUpdated;
            
            if(deployedImgNameSmall !== 'generic') {
                const deletionMsg = await removeImageDB(deployedImgNameSmall, 'profile/');
            }
            
        } else { 
            photoURLSmall = await uploadImageDB(profileImgNameSmall, profileImgFileSmall, 'profile/');
            let updateMsg = await updateProfileImg(localStorage.getItem('loggedUsername'), localStorage.getItem('loggedEmail'), photoURLSmall, profileImgNameSmall, 'small'  )
            updatedUser = updateMsg.userUpdated;

            if(deployedImgNameSmall !== 'generic') { 
                const deletionMsg = await removeImageDB(deployedImgNameSmall, 'profile/');
            }

            setDeployedImgNameSmall(updatedUser.profileImgNameSmall);
            
            localStorage.setItem('profileImgURLSmall', updatedUser.profileImgURLSmall);
            setProfileImgURLSmall(localStorage.getItem('profileImgURLSmall'));
            localStorage.setItem('profileImgNameSmall', updatedUser.profileImgNameSmall);
            setProfileImgNameSmall(localStorage.getItem('profileImgNameSmall'));
        }
        setShowCmsOverlay('none');
    }

    const handleSignOut = (e) => {
        e.preventDefault();
        /* socket.emit('logout', localStorage.getItem('loggedUsername')); */
        socket.emit('logout', jwtDecode(cookies.get('token')).username);
        cookies.remove('token', {sameSite: true, secure: true});
        localStorage.clear();
        window.location.href = '/';
    }

    useEffect(() => {

            setProfileImgURLLarge(localStorage.getItem('profileImgURLLarge'));
            setProfileImgNameLarge(localStorage.getItem('profileImgNameLarge'));
            setDeployedImgNameLarge(localStorage.getItem('profileImgNameLarge'));

            setProfileImgURLSmall(localStorage.getItem('profileImgURLSmall'));
            setProfileImgNameSmall(localStorage.getItem('profileImgNameSmall'));
            setDeployedImgNameSmall(localStorage.getItem('profileImgNameSmall'));

            setShowMenu('block');
            setNewArticleBtn('inline-block');
            setShowFrontend('none'); 
    }, [])

    return (
            <div  className = "profile-container">
                <div className = "profile">
        
                    {profileImgURLLarge === 'generic'?
                    <i className="fas fa-user-edit"></i>
                    : 
                    <img src = {profileImgURLLarge}></img>}
                    {deployedImgNameLarge == profileImgNameLarge && showCmsOverlay == 'none'?
                    <ChooseImage 
                        setProfileImgNameLarge = {setProfileImgNameLarge} 
                        setprofileImgFileLarge = {setprofileImgFileLarge} 
                        setProfileImgURLLarge = {setProfileImgURLLarge} 
                        widthLarge = {299}
                        
                        setProfileImgNameSmall = {setProfileImgNameSmall} 
                        setprofileImgFileSmall = {setprofileImgFileSmall} 
                        setProfileImgURLSmall = {setProfileImgURLSmall} 
                        widthSmall = {50}
                    />
                    :
                    <div>
                        <button 
                            className='profile-img-save'
                            onClick = {() => handleSave()}
                        >Sačuvaj
                        </button>
                    </div>
                    }

                    <div className = "profile-element">
                        <div className = "profile-element-description">Korisničko ime</div>
                        <div className = "profile-element-username data">{localStorage.getItem('loggedUsername')}</div>
                    </div>
                    <div className = "profile-element">
                        <div className = "profile-element-description">Ime</div>
                        <div className = "profile-element-firstname data">{localStorage.getItem('loggedFirstName')}</div>
                    </div>
                    <div className = "profile-element">
                        <div className = "profile-element-description">Prezime</div>
                        <div className = "profile-element-lastname data">{localStorage.getItem('loggedLastName')}</div>
                    </div>
                    <div className = "profile-element">
                        <div className = "profile-element-description">email</div>
                        <div className = "profile-element-email data">{localStorage.getItem('loggedEmail')}</div>
                    </div>
                    <button 
                        className = "profile-signOut"
                        onClick = {(e) => handleSignOut(e)}
                    >Odjavi se</button>
                </div>
            </div>
    )
}