import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage"
import ForgotPage from "./pages/Login/ForgotPage"
import Organism from "./pages/Organism/Organism";
import PrivateRoute from './components/Login/PrivateRoute.jsx'
import LayOutDashboard from "./layout/LayOutDashboard.jsx";
import TemplatePanel from "./pages/Organism/TemplatePanel";
import PasswordChange from "./pages/AccountSetting/PasswordChange";
import ManageUser from "./pages/AccountSetting/ManageUser";
import ApiToken from "./pages/AccountSetting/ApiToken";
import ProductSelect from "./pages/Organism/ProductSelect";
import Summary from "./pages/Organism/Summary";
import Authguard from "./components/Auth/Authguard.jsx";
import UnAuthguard from "./components/Auth/UnAuthGuard.jsx";
import TemplateEditPanel from "./pages/Organism/TemplateEditPanel.jsx";

const AuthRouteGroup = [
    {
        path: "product",
        element:
            <LayOutDashboard><Organism /></ LayOutDashboard>,
        title: "product"
    },
    {
        path: "product/template",
        element:
            <LayOutDashboard><TemplatePanel /></LayOutDashboard>,
        title: 'product/template'
    },
    {
        path: "product/edittemplate",
        element:
            <LayOutDashboard><TemplateEditPanel /></LayOutDashboard>,
        title: 'product/Edit-template'
    },
    {
        path: "user/password-change",
        element:
            <LayOutDashboard><PasswordChange /></LayOutDashboard>,
        title: 'password-change'
    },
    {
        path: "user/user-manage",
        element:
            <LayOutDashboard><ManageUser /></LayOutDashboard>,
        title: 'user-manage'
    },
    {
        path: "user/api-token",
        element:
            <LayOutDashboard><ApiToken /></LayOutDashboard>,
        title: 'ApiToken'
    },
    {
        path: "product/product-select",
        element:
            <LayOutDashboard><ProductSelect /></LayOutDashboard>,
        title: 'Product Select'
    },
    {
        path: "product/summary",
        element:
            <LayOutDashboard><Summary /></LayOutDashboard>,
        title: 'Summary'
    }
]

const UnAuthGroup = [
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
]


const Router = () => {
  const AuthRoutes = AuthRouteGroup.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={<Authguard component={element} />} />;
  });

  const UnauthRoutes = UnAuthGroup.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={<UnAuthguard component={element} />} />;
  });

  return (
    <Routes>
      {AuthRoutes}
      {UnauthRoutes}
    </Routes>
    )
}

export default Router;