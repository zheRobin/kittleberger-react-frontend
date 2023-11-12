import "./style/layoutCompoStyle.scss"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import OverlayGroup from "../Product-View/OverlayGroup"
import { useSelector } from "react-redux"

const SideNav = () => {
    const location = useLocation()
    const path = location.pathname
    const navigate = useNavigate()
    const selectedProducts = useSelector(state => state.products.selectedProducts)
    const handleSelect = () => {
        navigate('/product/product-select')
    }
    const handleSummary = () => {
        navigate('/product/summary')
    }
    return (
        <>
            <div className="nav-items">
                <div className={path === "/product/product-select" ? "nav-items--active pointer" : "nav-items--inactive pointer"} onClick={() => { handleSelect() }}>Produkte auswählen</div>
                {selectedProducts?.map((productItem, index) => {
                    return (
                        <div key={index} className={path === "/product/product-select" ? "nav-items--active pointer" : "nav-items--inactive pointer"} ><OverlayGroup productInfo={productItem} /></div>
                    )
                })}

                <div className={path === "/product/summary" ? "nav-items--active pointer" : "nav-items--inactive pointer"} onClick={() => { handleSummary() }}>Zusammenfassung</div>
            </div>
        </>
    )
}

export default SideNav