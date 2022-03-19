import React, { useState } from 'react';
// @ts-ignore
import heart from '../../assets/img/heart.svg';
// @ts-ignore
import heartRed from '../../assets/img/heart-red.svg';
import realWorldService from '../../service/realworld-service';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { PartialUser } from '../../types';
import storage from '../../storage/storage';

// @ts-ignore
import classes from './favorited.module.scss';

interface FavoritedProps {
  favoritesCount?: number;
  slug?: string;
  token: string;
  favorited?: boolean;
  author?: PartialUser;
}

const Favorited: React.FC<FavoritedProps> = ({
  favoritesCount,
  slug,
  token,
  favorited,
}: FavoritedProps) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [count, setCount] = useState(favoritesCount);

  const userDataStorage = JSON.parse(`${storage.getItem('userData')}`);

  const toggleLike = () => {
    if (!!userDataStorage) {
      if (isFavorited) {
        realWorldService
          .unfavoriteArticle(slug, token)
          .then(({ article }) => {
            setIsFavorited(article.favorited);
            setCount(article.favoritesCount);
          })
          .catch(console.log);
      } else {
        realWorldService
          .favoriteArticle(slug, token)
          .then(({ article }) => {
            setIsFavorited(article.favorited);
            setCount(article.favoritesCount);
          })
          .catch(console.log);
      }
    }
  };

  return (
    <div className={classes.favorited}>
      <img
        className={!!userDataStorage ? classes.like_resolved : classes.like_disabled}
        onClick={toggleLike}
        src={isFavorited ? heartRed : heart}
        alt="heart"
      />
      <div className={classes.count}>{count}</div>
    </div>
  );
};

const mapStatToProps = (state: RootState) => {
  return {
    token: state.userData.token,
  };
};

export default connect(mapStatToProps)(Favorited);
