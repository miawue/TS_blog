import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArticleModel } from '../../types';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import Profile from '../Profile';
import { btnText } from '../Button/constants';
import { Popconfirm } from 'antd';

import Button from '../Button';
import realWorldService from '../../service/realworld-service';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import Favorited from '../Favorited';
// @ts-ignore
import classes from './article.module.scss';

type ArticleProps = ArticleModel & {
  isSingleArticle?: boolean;
  username?: string;
  isLogin?: string;
  isButtonBlock?: boolean;
  token?: string;
  article?: ArticleModel;
};

const Article: React.FC<ArticleProps> = ({
  author,
  title,
  slug,
  favoritesCount,
  description,
  tagList = [],
  createdAt,
  body,
  favorited,
  isSingleArticle = false,
  isButtonBlock,
  token,
}: ArticleProps) => {
  const tags = tagList.map((tag) => (
    <div
      key={uuidv4()}
      className={isSingleArticle ? `${classes.tag} ${classes.tag__light}` : classes.tag}
    >
      {tag}
    </div>
  ));

  let navigate = useNavigate();

  const editArticle = () => navigate(`/articles/${slug}/edit`);

  const deleteArticle = () => {
    realWorldService
      .deleteteArticle(token, slug)
      .catch((err) => console.log('Article has been deleted'))
      .finally(() => navigate(`/articles/`));
  };

  const ref = useRef();

  return (
    <div
      className={
        isSingleArticle ? `${classes.wrapper} ${classes.wrapper__radius}` : classes.wrapper
      }
    >
      <div className={classes.summary}>
        <Link to={`/articles/${slug}`}>
          <h5 className={classes.title}>{title}</h5>
        </Link>
        <Favorited
          favoritesCount={favoritesCount}
          slug={slug}
          author={author}
          favorited={favorited}
        />
        <div className={classes.tags}>{tags} </div>
        <div
          className={
            isSingleArticle
              ? `${classes.description} ${classes.description__light}`
              : classes.description
          }
        >
          {description}
        </div>
      </div>
      <div className={classes.profile_wrapper}>
        <Profile username={author.username} image={author.image} createdAt={createdAt} />
        {isButtonBlock && (
          <div className={classes.btn_block}>
            <Popconfirm
              placement="rightTop"
              title={'Are you sure to delete this task?'}
              onConfirm={deleteArticle}
              okText="Yes"
              cancelText="No"
            >
              <Button design="highlight_delete" ref={ref}>
                {btnText.delete}
              </Button>
            </Popconfirm>
            <Button design="edit" onClick={editArticle}>
              {btnText.edit}
            </Button>
          </div>
        )}
      </div>

      {body && (
        <div className={classes.body}>
          <ReactMarkdown className={classes.markdown}>{body}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    token: state.userData.token,
  };
};

export default connect(mapStateToProps)(Article);
