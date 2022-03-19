import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUserData } from '../../redux/store/actions';
import Button from '../Button';
import Profile from '../Profile';
import { FormType } from '../../types';
import { RootState } from '../../redux/store';
import { btnText } from '../Button/constants';
import storage from '../../storage/storage';

// @ts-ignore
import classes from './header.module.scss';

interface HeaderProps {
  isLogin?: boolean;
  dispatch: (clearUserData: any) => void;
  username?: string;
  image?: string | null;
}

const Header = ({ username, image, isLogin, dispatch }: HeaderProps) => {
  let navigate = useNavigate();

  const logOut = useCallback(() => {
    dispatch(clearUserData());
    storage.clearStorage();
    navigate('/articles');
  }, [dispatch, navigate]);

  const createArticle = useCallback(() => {
    navigate('/new-article');
  }, [navigate]);

  return (
    <div className={classes.header}>
      <h1 className={classes.title}>
        <Link to={'/articles'}>Realworld Blog</Link>
      </h1>
      <div className={classes.authorization}>
        {!isLogin && (
          <>
            <Link to={`/auth/${FormType.SignIn}`}>
              <Button>{btnText.signIn}</Button>
            </Link>
            <Link to={`/auth/${FormType.SignUp}`}>
              <Button design="success">{btnText.signUp}</Button>
            </Link>
          </>
        )}

        {isLogin && (
          <>
            <Button design="success_create" onClick={createArticle}>
              {btnText.createArticle}
            </Button>
            <Link to={`/auth/${FormType.Profile}`}>
              <Profile username={username} image={image} />
            </Link>
            <Button design="logOut" onClick={logOut}>
              {btnText.logOut}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.userData.username,
    isLogin: state.userData.isLogin,
    image: state.userData.image,
  };
};

export default connect(mapStateToProps)(Header);
