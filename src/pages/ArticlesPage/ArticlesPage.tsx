import React, { useState, useEffect } from 'react';
import Article from '../../components/Article';
import { Pagination } from 'antd';
import { Alert } from 'antd';
import { Spin } from 'antd';
import realWorldService from '../../service/realworld-service';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { setPageNumber } from '../../redux/store/actions';
import storage from '../../storage/storage';

// @ts-ignore
import classes from './articles-page.module.scss';

const LIMIT = 5;

interface ArticlesPageProps {
  page: number;
  dispatch: (setPageNumber: any) => void;
  isLogin: boolean;
}

const ArticlesPage = ({ page, isLogin, dispatch }: ArticlesPageProps) => {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addArticles = () => {
    setError('');
    setLoading(true);
    const userDataStorage = JSON.parse(`${storage.getItem('userData')}`);
    const offsetNumber = LIMIT * (page - 1);

    realWorldService
      .getArticles(LIMIT, offsetNumber, userDataStorage?.token)
      .then((result) => {
        setArticles(result.articles);
        setTotal(result.articlesCount);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    addArticles();
  }, [page, isLogin]);

  const spinner = isLoading && (
    <div className={classes.spinner}>
      <Spin />
    </div>
  );

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div className={classes.container}>
      {spinner}
      {articles.map(
        ({ author, title, favoritesCount, favorited, createdAt, description, tagList, slug }) => {
          return (
            <Article
              key={uuidv4()}
              author={author}
              title={title}
              favorited={favorited}
              favoritesCount={favoritesCount}
              createdAt={createdAt}
              description={description}
              tagList={tagList}
              slug={slug}
            />
          );
        }
      )}{' '}
      {!isLoading && (
        <div className={classes.pagination}>
          <Pagination
            size="small"
            current={page}
            total={total}
            pageSize={LIMIT}
            showSizeChanger={false}
            onChange={(page) => dispatch(setPageNumber(page))}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    token: state.userData.token,
    page: state.pageNumber,
    isLogin: state.userData.isLogin,
  };
};

// @ts-ignore
export default connect(mapStateToProps)(ArticlesPage);
