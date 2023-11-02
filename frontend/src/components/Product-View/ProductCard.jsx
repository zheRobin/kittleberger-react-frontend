import "./style/productViewStyle.scss"
import editPencil from "../../assets/icons/pencil.svg"
const ProductCard = () => {
    return (
        <>
            <div className="product-card">
                <div className="product-panel">
                    <div className="product-info-group">
                        <div className="product-info">
                            <div className="product-name">Hero Keyvisual (2 Products)</div>
                            <div className="product-image-info">1600x640 px | 72 dpi | JPG</div>
                        </div>
                        <div className="product-icon">
                            <img src={editPencil} alt="editIcon"></img>
                        </div>
                    </div>
                </div>
                <div className="product-image">
                    <img src={require("../../assets/images/Image.png")} alt="images"></img>
                </div>
            </div>

        </>
    )
}

export default ProductCard