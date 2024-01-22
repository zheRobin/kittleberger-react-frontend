
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState, useRef } from "react"
import { SpinnerIcon, PencelWhiteIcon } from "libs/icons"
import "components/Product-View/style/productViewStyle.scss"

const Item = ({cardInfo}) => {
    const navigate = useNavigate();
    const role = useSelector(state => state.auth.role)
    const [loading, setLoading] = useState(true);
    const [tempImage, setTempImage] = useState(false)
    const counter = useRef(0);
    const imageLoaded = () => {
        counter.current += 1;
        if (counter.current >= 1) {
            setLoading(false);
        }
    }
    const handleImageError = () => {
        setTempImage(true);
        setLoading(false);
    }
    return (
        <>
            <div className="product-card">
                <div className="product-panel">
                    <div className="product-info-group">
                        <div className="product-info">
                            <div className="product-name">{cardInfo.n}</div>
                            <div className="product-image-info">{cardInfo.x + '\u00D7' + cardInfo.y + 'px | ' + cardInfo.d + 'dpi | ' + cardInfo.f}</div>
                        </div>
                        {role === 'admin' && cardInfo.m === 'template' ? 
                        <div className="product-icon pointer" onClick={() => navigate(`/template/${cardInfo.i}`)}>
                            <img src={PencelWhiteIcon} style={{ borderColor: "#FFFFFF" }} alt="editIcon"></img>
                        </div> : null
                        }
                    </div>
                </div>
                <div className="product-image pointer" onClick={(e) => navigate(cardInfo.l)}>
                    <div style={{ display: loading ? "block" : "none" }}>
                        <img src={SpinnerIcon} alt="preview" style={{ width: "150px" }}></img>
                    </div>
                    <div style={{ display: loading ? "none" : "block" }} onLoad={imageLoaded}>
                        {tempImage?
                        <img src="assets/images/img_error.png" alt="Preview" />:<img src={cardInfo.u} alt="preview" onError={handleImageError} onLoad={imageLoaded} />                       
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item