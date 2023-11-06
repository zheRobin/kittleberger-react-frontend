import "./style/layoutCompoStyle.scss"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const SideNav = () => {
    const location = useLocation()
    const path = location.pathname
    const navigate = useNavigate()
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
                <div className={path === "/product/summary" ? "nav-items--active pointer" : "nav-items--inactive pointer"} onClick={() => { handleSummary() }}>Zusammenfassung</div>
            </div>
        </>
    )
}

export default SideNav