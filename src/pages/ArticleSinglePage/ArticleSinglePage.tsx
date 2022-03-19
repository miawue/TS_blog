import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Article from '../../components/Article';
import { ArticleModel } from '../../types';
import { Alert } from 'antd';
import { Spin } from 'antd';
import realWorldService from '../../service/realworld-service';

// @ts-ignore
import classes from './article-single-page.module.scss';
import { RootState } from '../../redux/store';

interface ArticleSinglePageProps {
  username?: string;
  isLogin?: boolean;
  token?: string;
}

const ArticleSinglePage = ({ username, isLogin, token }: ArticleSinglePageProps) => {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<ArticleModel>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setLoading(true);

    realWorldService
      .getSingleArticle(slug, token)
      .then((result) => {
        setArticle(result.article);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [slug, token]);

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
      {article && (
        <Article
          author={article.author}
          title={article.title}
          favorited={article.favorited}
          favoritesCount={article.favoritesCount}
          createdAt={article.createdAt}
          description={article.description}
          tagList={article.tagList}
          slug={slug}
          isSingleArticle={true}
          isButtonBlock={isLogin && !!username && username === article.author.username}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.userData.username,
    isLogin: state.userData.isLogin,
    token: state.userData.token,
  };
};

export default connect(mapStateToProps)(ArticleSinglePage);
