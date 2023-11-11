import "./style/productViewStyle.scss"
import cancel from "../../assets/icons/cross.svg"
import { useState } from "react"

const ProductBackgroundCard = () => {
    const [view, setView] = useState(true)
    return (
        <>
            {view ? (
                <div className="product-card">
                    <div className="product-panel">
                        <div className="product-info-group">
                            <div className="product-info">
                                <div className="product-name"></div>
                                <div className="product-image-info"></div>
                            </div>
                            <div className="product-icon pointer" onClick={(e) => { setView(false) }}>
                                <img src={cancel} style={{ backgroundColor: "white", border: "none" }} alt="cancelIcon"></img>
                            </div>
                        </div>
                    </div>
                    <div className="product-image pointer">
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default ProductBackgroundCard