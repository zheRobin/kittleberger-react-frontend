import "./style/layoutCompoStyle.scss"
import returnIcon from "assets/icons/arw-node-l.svg"
import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"

const ReturnPath = () => {
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const returnHistory = () => {
        navigate('/')
    }
    const { t, i18n } = useTranslation()
    return (
        <>
            <div className="return-path pointer" onClick={() => returnHistory()}>
                <img src={returnIcon} alt="return" />
                <div className="typography-400-regular">{t("Zurück zur Startseite")}</div>
            </div>
        </>
    )
}

export default ReturnPath