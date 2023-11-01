import LoginPage from "./Login/LoginPage"
import ForgotPage from "./Login/ForgotPage"
import Organism from "./Organism/Organism";
import PrivateRoute from "../components/Login/PrivateRoute";

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
            <Organism />,
        title: "organism"
    }
]

export default pagesData;