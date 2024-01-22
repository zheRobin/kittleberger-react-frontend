import "../style/dashboardStyle.scss"
import checkIcon from "assets/icons/check.svg"
import passwordSetting from "assets/icons/unlock.svg"
import infoEdit from "assets/icons/edit-user.svg"
import tokenSearch from "assets/icons/search.svg"
import logout from "assets/icons/door.svg"
import { authActions } from "store/reducer"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { infoActions } from "store/reducer"
import gear from "assets/icons/settings-gear.svg"
function getInitials(string) {
    const words = string.split(" ");
    const initials = words?.map((word) => word[0]?.toUpperCase());
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
    }, [handleModal, ref]);
}


const ProfileLayout = ({ handleModal }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const boxRef = useRef(null);
    const handlelogout = (e) => {
        dispatch(authActions.logout())
    }
    const selectedLanguage = useSelector(state => state.info.language)
    const user = useSelector(state => state.auth.user)
    const userType = user.is_staff ? "admin" : "user"
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
    }, [handleModal]);
    const { t, i18n } = useTranslation()
    const handleLanguageChange = lng  => {
        i18n.changeLanguage(lng);
    };
    return (
        <>
            <div className="profile-layout" ref={wrapperRef}>
                <div className="profile-info">
                    <div className="user-icon">
                        <div className="user-alias">{getInitials(user.username)}</div>
                    </div>
                    <div className="user-account">
                        <div className="user-label">{t(capitalizedUserType)}</div>
                        <div className="user-name">{t(user.username)}</div>
                        <div className="user-email">{t(user.email)}</div>
                    </div>
                </div>
                <div className="profile-detail">
                    <div className="set-language">
                        <div className="language-label">{t('Systemsprache')}</div>
                        <div
                            className={selectedLanguage === 'en' ? "language-active pointer" : "language-inactive pointer"}
                            onClick={(e) => {
                                dispatch(infoActions.setSelectedLanguage('en'));
                                handleLanguageChange('en');
                            }}
                        >
                            <div>{t('English')}</div>
                            {selectedLanguage === 'en' ? <div><img src={checkIcon} alt="checkIcon" /></div> : null}
                        </div>
                        <div
                            className={selectedLanguage === 'de' ? "language-active pointer" : "language-inactive pointer"}
                            onClick={(e) => {
                                dispatch(infoActions.setSelectedLanguage('de'));
                                handleLanguageChange('de');
                            }}
                        >
                            <div>{t('German')}</div>
                            {selectedLanguage === 'de' ? <div><img src={checkIcon} alt="checkIcon" /></div> : null}
                        </div>
                    </div>
                    <div className="user-account">
                        <div className="account-label">{t('Konto')}</div>
                        <div className="account-setting">
                            <div className="account-detail">
                                <div className="account-detail-info pointer" onClick={() => { navigate("/setting/password"); handleModal(false) }}>
                                    <img src={passwordSetting} alt={t('Password Change')}></img>
                                    <div className="account-description">{t('Passwort ändern')}</div>
                                </div>
                            </div>
                            {user.is_staff ? (
                                <>
                                    <div className="account-detail pointer" onClick={() => { navigate("/setting/users"); handleModal(false) }}>
                                        <div className="account-detail-info">
                                            <img src={infoEdit} alt={t('Password Change')}></img>
                                            <div className="account-description">{t('Benutzer verwalten')}</div>
                                        </div>
                                    </div>
                                    <div className="account-detail pointer" onClick={() => { navigate("/setting/api-token"); handleModal(false) }}>
                                        <div className="account-detail-info">
                                            <img src={tokenSearch} alt={t('Token')}></img>
                                            <div className="account-description">{t('API-Token')}</div>
                                        </div>
                                    </div>
                                    <div className="account-detail pointer" onClick={() => { navigate("/setting/contents"); handleModal(false) }}>
                                        <div className="account-detail-info">
                                            <img src={gear} alt={t('Setting')}></img>
                                            <div className="account-description">{t('Einstellung')}</div>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                            <div className="account-detail pointer" onClick={e => handlelogout(e)}>
                                <div className="account-detail-info">
                                    <div className="account-setting-img"><img src={logout} alt={t('Password Change')}></img></div>
                                    <div className="account-description">{t('Abmelden')}</div>
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