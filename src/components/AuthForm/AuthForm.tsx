import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../../redux/store/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spin } from 'antd';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import Field from '../Field';
import { inputsData, titles, bottomText, linkText, linkUrl, schema } from './constants';
import realWorldService from '../../service/realworld-service';
import storage from '../../storage/storage';

import { FormType, PartialUser } from '../../types';
import { btnText } from '../Button/constants';

// @ts-ignore
import classes from './auth-form.module.scss';

interface AuthFormProps {
  formType: FormType;
  dispatch: (setUserData: any) => void;
  token: string;
  username: string;
  email: string;
  image: string | null;
}

type UserModelType = PartialUser & { password: string; token: string };

export const AuthForm = ({ formType, dispatch, token, username, email }: AuthFormProps) => {
  const [serverErrors, setServerErrors] = useState('');
  const [isLoading, setLoading] = useState(false);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors },
    reset,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema[formType]),
  });

  const onSubmit = (user: UserModelType) => {
    const fetchedData = {
      email: user.email || email,

      username: user.username || username,
      token,

      bio: user.bio,

      image: user.image || Image,
    };
    setLoading(true);
    setServerErrors('');
    switch (formType) {
      case FormType.SignIn:
        realWorldService
          .loginExistUser(user)
          .then(({ user }) => {
            storage.setItem('userData', JSON.stringify(user));

            dispatch(setUserData(user));
            navigate('/articles');
          })
          .catch((error) => setServerErrors(error.message))
          .finally(() => setLoading(false));
        break;
      case FormType.SignUp:
        realWorldService
          .registerNewUser(user)
          .then(({ user }) => {
            storage.setItem('userData', JSON.stringify(user));
            dispatch(setUserData(user));
            navigate('/articles');
          })
          .catch((error) => setServerErrors(error.message))
          .finally(() => setLoading(false));
        break;
      case FormType.Profile:
        realWorldService
          .updateCurrentUser(fetchedData as UserModelType, token)
          .then(({ user }) => {
            dispatch(setUserData(user));
          })
          .catch((error) => setServerErrors(error.message))
          .finally(() => setLoading(false));
    }

    reset();
  };

  return (
    <Spin tip="Please, wait..." spinning={isLoading}>
      <div className={classes.wrapper}>
        <div className={classes.title}>{titles[formType]}</div>
        {/* @ts-ignore. */}
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {inputsData[formType].map(({ id, label, type, name, placeholder }) => {
            return (
              <label
                key={id}
                className={
                  type === 'checkbox' ? `${classes.label} ${classes[`for_${type}`]}` : classes.label
                }
              >
                <div
                  className={
                    name === 'checkbox' ? `${classes.text} ${classes.text_checkbox}` : classes.text
                  }
                >
                  {label}
                </div>
                <div className={type === 'checkbox' ? `${classes[`wrapper_${type}`]}` : ''}>
                  <Field
                    htmlTag="input"
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    isError={clientErrors[name] ? true : false}
                    register={register(name)}
                    defaultValue={name === 'username' ? username : name === 'email' ? email : ''}
                  />
                </div>
                <div className={classes.error}>
                  {clientErrors[name]?.message ||
                    (serverErrors?.includes(name) && serverErrors) ||
                    null}
                </div>
              </label>
            );
          })}
          <Button design="primary" type="submit">
            {btnText[formType]}
          </Button>
          {formType !== FormType.Profile && (
            <div className={classes.bottom_container}>
              {bottomText[formType]}
              <Link to={`/auth/${linkUrl[formType]}`} className={classes.link}>
                <span className={classes.link_text}>{linkText[formType]}</span>
              </Link>
            </div>
          )}
        </form>
      </div>
    </Spin>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    token: state.userData.token,
    username: state.userData.username,
    email: state.userData.email,
    image: state.userData.image,
  };
};

export default connect(mapStateToProps)(AuthForm);
