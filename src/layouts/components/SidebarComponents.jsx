import Filterbar from "components/LayoutComponents/Filterbar"
import "../style/dashboardStyle.scss"
import { useMatch } from "react-router-dom"
import ReturnPath from "components/LayoutComponents/ReturnPath"
import EditSidebar from "components/LayoutComponents/EditSidebar"
import ViewSidebar from "components/LayoutComponents/ViewSidebar"
import CreateSidebar from "components/LayoutComponents/CreateSidebar"
const SidebarComponents = () => {
    const matchEdit = useMatch("/composing/edit/:id");
    const matchView = useMatch("/composing/view/:id");
    const matchCreate = useMatch("/composing/view");

    const SideBar = () => {
        if(matchEdit) {
            return (<><ReturnPath /><EditSidebar /></>);
        }
        if(matchView) {
            return (<><ReturnPath /><ViewSidebar /></>);
        }
        if(matchCreate) {
            return (<><ReturnPath /><CreateSidebar /></>);
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