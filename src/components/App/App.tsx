import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { setUserData } from '../../redux/store/actions';
import { useDispatch } from 'react-redux';
import realWorldService from '../../service/realworld-service';
import Header from '../Header';
import ArticlesPage from '../../pages/ArticlesPage';
import ArticleSinglePage from '../../pages/ArticleSinglePage';
import ArticleEditPage from '../../pages/ArticleEditPage/ArticleEditPage';
import PrivateRoute from '../PrivateRoute';
import { FormType } from '../../types';
import AuthPage from '../../pages/AuthPage';
import storage from '../../storage/storage';

// @ts-ignore
import classes from './app.module.scss';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userDataStorage = JSON.parse(`${storage.getItem('userData')}`);

    if (userDataStorage) {
      if (userDataStorage.token && userDataStorage.username) {
        dispatch(setUserData(userDataStorage));
      }

      realWorldService
        .getCurrentUser(userDataStorage?.token)
        .then(({ user }) => {
          dispatch(setUserData(user));
        })
        .catch(console.error);
    }
  }, [dispatch]);

  return (
    <div className={classes.wrapper}>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesPage />} />

        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticleSinglePage />} />
        <Route
          path={`/auth/${FormType.SignIn}`}
          element={<AuthPage formType={FormType.SignIn} />}
        />
        <Route
          path={`/auth/${FormType.SignUp}`}
          element={<AuthPage formType={FormType.SignUp} />}
        />
        <Route
          path={`/auth/${FormType.Profile}`}
          element={
            <PrivateRoute>
              <AuthPage formType={FormType.Profile} />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-article"
          element={
            <PrivateRoute>
              <ArticleEditPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            <PrivateRoute>
              <ArticleEditPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
