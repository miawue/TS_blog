import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import storage from '../../storage/storage';
import { FormType } from '../../types';

interface PrivateRouteProps {
  isLogin?: boolean;
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isLogin }) => {
  const userDataStorage = JSON.parse(`${storage.getItem('userData')}`);

  if (!(!!userDataStorage?.token || !!isLogin)) {
    return <Navigate to={`/auth/${FormType.SignIn}`} />;
  }
  return children;
};

const mapStateToProps = (state: RootState) => {
  return {
    isLogin: state.userData.isLogin,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
