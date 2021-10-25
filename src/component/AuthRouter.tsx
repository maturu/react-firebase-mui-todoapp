import React, { FC, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

export const AuthRouter: FC = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <>{children}</> : <Redirect to="/signin" />;
};
