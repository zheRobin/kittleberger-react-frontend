import Filterbar from "components/LayoutComponents/Filterbar"
import "../style/dashboardStyle.scss"
import { useMatch } from "react-router-dom"
import ReturnPath from "components/LayoutComponents/ReturnPath"
import SideNav from "components/LayoutComponents/SideNav"
const SidebarComponents = () => {
    const matchEdit = useMatch("/composing/edit/:id");
    const matchView = useMatch("/composing/view/:id");

    const SideBar = () => {
        if(matchEdit || matchView) {
            return (<><ReturnPath /><SideNav /></>);
        }
        else if (window.location.pathname === "/") {
            return (<Filterbar />);
        }
        else {
            return <ReturnPath />;
        }
    }

    return (
        <div className="sidebar-items">
            <SideBar />
        </div>
    )
}

export default SidebarComponents