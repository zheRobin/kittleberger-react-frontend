import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from 'layouts';

import Login from "pages/auth/login"
import ForgetPassword from "pages/auth/forget-password"

import Home from "pages/main/Home";
import Composing from "pages/main/Composing";
import Summary from "pages/main/Summary";
import Template from "pages/main/Template";

import ChangePassword from "pages/settings/ChangePassword";
import ManageUser from "pages/settings/ManageUser";
import ApiToken from "pages/settings/ApiToken";
import Setting from "pages/settings/Setting";

const routes = [
    { path: "/", component: Home },
    { path: "template", component: Template },
    { path: "setting/password", component: ChangePassword },
    { path: "setting/users", component: ManageUser },
    { path: "setting/api-token", component: ApiToken },
    { path: "setting/contents", component: Setting },
    { path: "composing/edit/:id", component: Composing },
    { path: "composing/view", component: Summary }
  ];
  
const AuthRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Layout><Component /></Layout>} />
      ))}
    </Routes>
  );
};

const AnonRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="forgot-password" element={<ForgetPassword />} />
    </Routes>
  );
};

export { AuthRoutes, AnonRoutes };