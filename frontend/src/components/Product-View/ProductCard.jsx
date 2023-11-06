import "./style/productViewStyle.scss"
import editPencil from "../../assets/icons/pencil-white.svg"
import cancel from "../../assets/icons/cross.svg"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ title, imageInfo, cardtype = "edit" }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="product-card">
                <div className="product-panel">
                    <div className="product-info-group">
                        <div className="product-info">
                            <div className="product-name">{title}</div>
                            <div className="product-image-info">{imageInfo}</div>
                        </div>
                        <div className="product-icon pointer" onClick={() => navigate("/product/template")}>
                            <img src={cardtype === "edit" ? editPencil : cancel} style={cardtype !== "edit" ? { backgroundColor: "white", border: "none" } : { borderColor: "#FFFFFF" }} alt="editIcon"></img>
                        </div>
                    </div>
                </div>
                <div className="product-image pointer" onClick={() => navigate("/product/product-select")}>
                    <img src={require("../../assets/images/Image.png")} alt="images"></img>
                </div>
            </div>
        </>
    )
}

export default ProductCard