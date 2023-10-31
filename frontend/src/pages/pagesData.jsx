import LoginPage from "./Login/LoginPage"
import ForgotPage from "./Login/ForgotPage"
const pagesData = [
    {
        path: "",
        element: <LoginPage />,
        title: "Login"
    },
    {
        path: "forgot",
        element: <ForgotPage />,
        title: "about"
    }

]

export default pagesData;