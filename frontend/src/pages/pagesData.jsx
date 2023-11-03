import LoginPage from "./Login/LoginPage"
import ForgotPage from "./Login/ForgotPage"
import Organism from "./Organism/Organism";
import PrivateRoute from "../components/Login/PrivateRoute";
import LayOutDashboard from "../layout/LayOutDashboard";
import TemplatePanel from "./Organism/TemplatePanel";


const pagesData = [
    {
        path: "",
        element:
            < PrivateRoute >
                <LoginPage />
            </PrivateRoute >,
        title: "Login"
    },
    {
        path: "forgot",
        element: <ForgotPage />,
        title: "forgot"
    },
    {
        path: "organism",
        element:
            <LayOutDashboard><Organism /></ LayOutDashboard>,
        title: "organism"
    },
    {
        path: "template",
        element:
            <LayOutDashboard><TemplatePanel /></LayOutDashboard>,
        title: 'template'
    }
]

export default pagesData;