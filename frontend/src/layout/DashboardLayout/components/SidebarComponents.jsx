import Filterbar from "../../../components/LayoutComponents/Filterbar"
import "../style/dashboardStyle.scss"
import { useLocation } from "react-router-dom"
import ReturnPath from "../../../components/LayoutComponents/ReturnPath"
import SideNav from "../../../components/LayoutComponents/SideNav"

const SidebarComponents = () => {
    const location = useLocation()
    const path = location.pathname
    const SideBar = () => {
        switch (path) {
            case "/product":
                return (<Filterbar />)
            case "/product/product-select":
                return (<><ReturnPath /><SideNav /></>);
            case "/product/summary":
                return (<><ReturnPath /><SideNav /></>);
            default:
                return <ReturnPath />
        }
    }
    return (
        <div className="sidebar-items">
            <SideBar />
        </div>

    )
}

export default SidebarComponents