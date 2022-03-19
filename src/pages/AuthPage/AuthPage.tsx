import React from 'react';
import AuthForm from '../../components/AuthForm';
import { FormType } from '../../types';

interface AuthPageProps {
  formType: FormType;
}

const AuthPage = (props: AuthPageProps) => {
  return <AuthForm {...props} />;
};

export default AuthPage;
