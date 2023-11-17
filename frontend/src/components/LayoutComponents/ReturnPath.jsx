import "./style/layoutCompoStyle.scss"
import returnIcon from "../../assets/icons/arw-node-l.svg"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { emptyStore } from "../../store"

const ReturnPath = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const returnHistory = () => {
        dispatch(emptyStore())
        navigate('/product')
    }
    return (
        <>
            <div className="return-path pointer" onClick={() => returnHistory()}>
                <img src={returnIcon} alt="return" />
                <div className="typography-400-regular">Zurück zur Startseite</div>
            </div>
        </>
    )
}

export default ReturnPath