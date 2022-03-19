import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleForm from '../../components/ArticleForm';

// @ts-ignore
import classes from './article-edit-page.module.scss';

const ArticleEditPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className={classes.container}>
      <ArticleForm currentSlug={slug} />
    </div>
  );
};

export default ArticleEditPage;
