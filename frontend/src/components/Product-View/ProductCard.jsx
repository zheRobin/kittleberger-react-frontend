import "./style/productViewStyle.scss"
import editPencil from "../../assets/icons/pencil-white.svg"
import cancel from "../../assets/icons/cross.svg"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { findTemplates } from "../../store"

const ProductCard = ({ cardInfo, cardtype = "edit" }) => {
    const navigate = useNavigate();
    const switchRole = useSelector(state => state.info.adminMethod)
    const dispatch = useDispatch()

    return (
        <>
            <div className="product-card">
                <div className="product-panel">
                    <div className="product-info-group">
                        <div className="product-info">
                            <div className="product-name">{cardInfo?.name}</div>
                            <div className="product-image-info">{cardInfo?.resolution_width + '\u00D7' + cardInfo?.resolution_height + 'px | ' + cardInfo?.resolution_dpi + " | " + cardInfo?.file_type}</div>
                        </div>
                        <div className="product-icon pointer" onClick={() => { navigate("/product/template") }}>
                            {switchRole ? <img src={cardtype === "edit" ? editPencil : cancel} style={cardtype !== "edit" ? { backgroundColor: "white", border: "none" } : { borderColor: "#FFFFFF" }} alt="editIcon"></img> : null}
                        </div>
                    </div>
                </div>
                <div className="product-image pointer" onClick={(e) => { dispatch(findTemplates(cardInfo)); navigate(`/product/product-select`) }}>
                    {/* <img src={cardInfo?.bg_image_cdn_url} alt="images"> */}
                    <img src={cardInfo?.preview_image_cdn_url} alt="preview"></img>
                    {/* </img> */}
                </div>
            </div>
        </>
    )
}

export default ProductCard