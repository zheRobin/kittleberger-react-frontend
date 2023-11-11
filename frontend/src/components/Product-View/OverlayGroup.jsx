
import ListIcon from "../../assets/icons/drag&drop.svg"
import CrossIcon from "../../assets/icons/cross-white.svg"
import SettingIcon from "../../assets/icons/controal-4.svg"
import { removeProducts } from "../../store"
import { useDispatch } from "react-redux"
import "./style/productViewStyle.scss"

const OverlayGroup = ({ productInfo }) => {
    const dispatch = useDispatch()
    return (
        <div className="overlay">
            <div className="overlay__list">
                <img src={ListIcon} alt="ListIcon"></img>
            </div>
            <div className="overlay__product">
                <div className="typography-400-regular" style={{ color: "white", overflow: "hidden", lineHeight: "16px", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{productInfo.name}</div>
                <img src={CrossIcon} alt="CrossIcon" onClick={(e) => { console.log("+++++++"); dispatch(removeProducts(productInfo)) }}></img>
            </div>
            <div className="overlay__setting">
                <img src={SettingIcon} alt="SettingIcon"></img>
            </div>
        </div>
    )
}

export default OverlayGroup