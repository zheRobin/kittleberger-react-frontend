import "./style/productViewStyle.scss"
import editPencil from "../../assets/icons/pencil-white.svg"
import cancel from "../../assets/icons/cross.svg"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { findTemplates, setProductLists, setComposedProduct, setCardInfo } from "../../store"
import { useState, useRef } from "react"
import spinner from "../../assets/icons/tube-spinner.svg"

const ProductCard = ({ cardInfo, cardtype = "edit", type = 1 }) => {
    const navigate = useNavigate();
    const switchRole = useSelector(state => state.info.adminMethod)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const counter = useRef(0);
    const imageLoaded = () => {
        counter.current += 1;
        if (counter.current >= 1) {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="product-card">
                <div className="product-panel">
                    <div className="product-info-group">
                        <div className="product-info">
                            <div className="product-name">{cardInfo?.name}</div>
                            <div className="product-image-info">
                                {type === 1 ? cardInfo?.resolution_width + '\u00D7' + cardInfo?.resolution_height + 'px | ' + cardInfo?.resolution_dpi + "dpi | " + cardInfo?.file_type : cardInfo?.template?.resolution_width + '\u00D7' + cardInfo?.template?.resolution_height + 'px | ' + cardInfo?.template?.resolution_dpi + "dpi | " + cardInfo?.template?.file_type}
                            </div>
                        </div>
                        <div className="product-icon pointer" onClick={() => { if (type === 1) { navigate("/product/edittemplate", { state: cardInfo }) } else { navigate("/product/edittemplate", { state: cardInfo.template }) } }}>
                            {switchRole ? <img src={cardtype === "edit" ? editPencil : cancel} style={cardtype !== "edit" ? { backgroundColor: "white", border: "none" } : { borderColor: "#FFFFFF" }} alt="editIcon"></img> : null}
                        </div>
                    </div>
                </div>
                <div className="product-image pointer" onClick={(e) => {
                    if (type === 1) {
                        localStorage.setItem('templateInfo', JSON.stringify(cardInfo));
                        dispatch(findTemplates(cardInfo));
                        navigate(`/product/product-select`)
                    }
                    if (type === 2) {
                        localStorage.setItem('templateInfo', JSON.stringify(cardInfo.template));
                        dispatch(setCardInfo(cardInfo))
                        dispatch(setComposedProduct(cardInfo?.cdn_url.split('.').pop() === 'tiff' ? cardInfo?.png_result : cardInfo?.cdn_url))
                        dispatch(findTemplates(cardInfo.template));
                        const updatedArticles = cardInfo.articles.map((article) => {
                            const { number, ...rest } = article;
                            return { article_number: number, ...rest };
                        });
                        dispatch(setProductLists(updatedArticles));
                        navigate(`/product/summary`, {
                            state: { cdn: cardInfo?.cdn_url, name: cardInfo?.name }
                        })
                    }
                }}>
                    <div style={{ display: loading ? "block" : "none" }}>
                        <img src={spinner} alt="preview" onLoad={imageLoaded} style={{ width: "150px" }}></img>
                    </div>
                    <div style={{ display: loading ? "none" : "block" }}>
                        <img src={type === 1 ? (cardInfo?.preview_image_cdn_url ? cardInfo?.preview_image_cdn_url : cardInfo?.bg_image_cdn_url) : (cardInfo?.cdn_url.split('.').pop() === 'tiff' ? cardInfo?.png_result : cardInfo?.cdn_url)} alt="preview" onLoad={imageLoaded}></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard