import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from 'layouts';

import Login from "pages/auth/login"
import ForgetPassword from "pages/auth/forget-password"

import Home from "pages/main/Home";
import Composing from "pages/main/Composing";
import Summary from "pages/main/Summary";
import ProductView from "pages/main/ProductView";
import EditTemplate from "pages/main/EditTemplate";
import CreateTemplate from "pages/main/CreateTemplate";

import ChangePassword from "pages/settings/ChangePassword";
import ManageUser from "pages/settings/ManageUser";
import ApiToken from "pages/settings/ApiToken";
import Setting from "pages/settings/Setting";

const routes = [
    { path: "/", component: Home },
    { path: "template", component: CreateTemplate },
    { path: "template/:id", component: EditTemplate },
    { path: "setting/password", component: ChangePassword },
    { path: "setting/users", component: ManageUser },
    { path: "setting/api-token", component: ApiToken },
    { path: "setting/contents", component: Setting },
    { path: "composing/edit/:id", component: Composing },
    { path: "composing/view", component: Summary },
    { path: "composing/view/:id", component: ProductView }
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
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { AuthRoutes, AnonRoutes };