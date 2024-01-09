import { Route, Routes } from "react-router-dom";
import Layout from "layouts";

// Anon user pages
import Login from "pages/auth/login"
import ForgetPassword from "pages/auth/forget-password.jsx"

// Authed user main pages
import Home from "pages/main/Home";
import Composing from "pages/main/Composing";
import Summary from "pages/main/Summary";

// Authed user sub pages
import TemplateItem from "pages/main/partials/TemplateItem";
import TemplateEditPanel from "pages/main/TemplateEditPanel.jsx";

// Authed user setting pages
import ChangePassword from "pages/settings/ChangePassword";
import ManageUser from "pages/settings/ManageUser";
import ApiToken from "pages/settings/ApiToken";
import Setting from "pages/settings/Setting.jsx";

// Auth components
import PrivateRoute from 'components/auth/PrivateRoute.jsx'
import Authguard from "components/auth/Authguard.jsx";
import UnAuthguard from "components/auth/UnAuthGuard.jsx";

const AuthRouteGroup = [
    {
        path: "product",
        element:
            <Layout><Home /></ Layout>,
        title: "product"
    },
    {
        path: "product/template",
        element:
            <Layout><TemplateItem /></Layout>,
        title: 'product/template'
    },
    {
        path: "product/edittemplate",
        element:
            <Layout><TemplateEditPanel /></Layout>,
        title: 'product/Edit-template'
    },
    {
        path: "user/password-change",
        element:
            <Layout><ChangePassword /></Layout>,
        title: 'password-change'
    },
    {
        path: "user/user-manage",
        element:
            <Layout><ManageUser /></Layout>,
        title: 'user-manage'
    },
    {
        path: "user/api-token",
        element:
            <Layout><ApiToken /></Layout>,
        title: 'ApiToken'
    },
    {
        path: "user/setting",
        element:
            <Layout><Setting /></Layout>,
        title: 'ApiToken'
    },
    {
        path: "product/product-select",
        element:
            <Layout><Composing /></Layout>,
        title: 'Product Select'
    },
    {
        path: "product/summary",
        element:
            <Layout><Summary /></Layout>,
        title: 'Summary'
    }
]

const UnAuthGroup = [
  {
    path: "",
    element:
        < PrivateRoute >
            <Login />
        </PrivateRoute >,
    title: "Login"
  },
  {
    path: "forgot",
    element: <ForgetPassword />,
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