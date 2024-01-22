import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthRoutes, AnonRoutes } from "./provider";
import { authActions } from 'store/reducer';

const Router = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(authActions.getUser({ token }));
    }
  }, [dispatch, token]);

  return token ? <AuthRoutes /> : <AnonRoutes />;
  
};

export default Router;