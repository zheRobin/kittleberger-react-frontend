import "../style/dashboardStyle.scss"
import checkIcon from "../../../assets/icons/check.svg"
import passwordSetting from "../../../assets/icons/unlock.svg"
import infoEdit from "../../../assets/icons/edit-user.svg"
import tokenSearch from "../../../assets/icons/search.svg"
import logout from "../../../assets/icons/door.svg"
import { authActions } from "../../../store"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useRef, useEffect, useState } from "react"

function getInitials(string) {
    const words = string.split(" ");
    const initials = words.map((word) => word[0].toUpperCase());
    return initials.join("");
}


function useOutsideAlerter(ref, handleModal) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleModal(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


const ProfileLayout = ({ handleModal }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const boxRef = useRef(null);
    const handlelogout = (e) => {
        dispatch(authActions.logout())
    }
    const switchRole = useSelector(state => state.info.adminMethod)
    const user = useSelector(state => state.auth.user)
    const userType = user.is_superuser ? "super" : (user.is_staff ? "admin" : "customer")
    const capitalizedUserType = userType.charAt(0).toUpperCase() + userType.slice(1);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, handleModal);
    useEffect(() => {
        window.onclick = (event) => {
            if (event.target.contains(boxRef.current)
                && event.target !== boxRef.current) {
                handleModal(false)
            }
        }
    }, []);
    const [language, setLanguage] = useState(1)
    return (
        <>
            <div className="profile-layout" ref={wrapperRef}>
                <div className="profile-info" >
                    <div className="user-icon">
                        <div className="user-alias">{getInitials(user.username)}</div>
                    </div>
                    <div className="user-account">
                        <div className="user-label">
                            {capitalizedUserType}
                        </div>
                        <div className="user-name">
                            {user.username}
                        </div>
                        <div className="user-email">
                            {user.email}
                        </div>
                    </div>
                </div>
                <div className="profile-detail">
                    <div className="set-language">
                        <div className="language-label">System language</div>
                        <div
                            className={language === 1 ? "language-active pointer" : "language-inactive pointer"}
                            onClick={(e) => {
                                setLanguage(1);
                            }}
                        >
                            <div>English</div>
                            {language === 1 ? <div><img src={checkIcon} alt="checkIcon" /></div> : null}
                        </div>
                        <div
                            className={language === 2 ? "language-active pointer" : "language-inactive pointer"}
                            onClick={(e) => {
                                setLanguage(2);
                            }}
                        >
                            <div>German</div>
                            {language === 2 ? <div><img src={checkIcon} alt="checkIcon" /></div> : null}
                        </div>
                    </div>
                    <div className="user-account">
                        <div className="account-label">Account</div>
                        <div className="account-setting">
                            <div className="account-detail">
                                <div className="account-detail-info pointer" onClick={() => { navigate("/user/password-change"); handleModal(false) }}>
                                    <img src={passwordSetting} alt="Password Change"></img>
                                    <div className="account-description">Passwort ändern</div>
                                </div>
                            </div>
                            {switchRole ? (
                                <>
                                    <div className="account-detail pointer">
                                        <div className="account-detail-info" onClick={() => { navigate("/user/user-manage"); handleModal(false) }}>
                                            <img src={infoEdit} alt="Password Change"></img>
                                            <div className="account-description">Benutzer verwalten</div>
                                        </div>
                                    </div>
                                    <div className="account-detail pointer">
                                        <div className="account-detail-info" onClick={() => { navigate("/user/api-token"); handleModal(false) }}>
                                            <img src={tokenSearch} alt="Password Change"></img>
                                            <div className="account-description">API-Token</div>
                                        </div>
                                    </div>
                                </>
                            ) : null}

                            <div className="account-detail pointer" onClick={e => handlelogout(e)}>
                                <div className="account-detail-info">
                                    <div className="account-setting-img"><img src={logout} alt="Password Change"></img></div>
                                    <div className="account-description">Abmelden</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProfileLayout