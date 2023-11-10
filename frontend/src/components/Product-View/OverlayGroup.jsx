
import ListIcon from "../../assets/icons/drag&drop.svg"
import CrossIcon from "../../assets/icons/cross-white.svg"
import SettingIcon from "../../assets/icons/controal-4.svg"
import "./style/productViewStyle.scss"

const OverlayGroup = ({ productName }) => {
    return (
        <div className="overlay">
            <div className="overlay__list">
                <img src={ListIcon} alt="ListIcon"></img>
            </div>
            <div className="overlay__product">
                <div className="typography-400-regular" style={{ color: "white", whiteSpace: "nowrap", overflow: "hidden", lineHeight: "16px", width: "80px" }}>{productName}</div>
                <img src={CrossIcon} alt="CrossIcon"></img>
            </div>
            <div className="overlay__setting">
                <img src={SettingIcon} alt="SettingIcon"></img>
            </div>
        </div>
    )
}

export default OverlayGroup