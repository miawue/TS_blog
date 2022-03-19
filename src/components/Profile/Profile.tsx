import React from 'react';
import { PartialUser } from '../../types';
// @ts-ignore
import avatar from '../../assets/img/avatar.png';
import { format } from 'date-fns';

// @ts-ignore
import classes from './profile.module.scss';

type PropfileProps = Pick<PartialUser, 'username' | 'image'> & { createdAt?: string };

const Profile = ({ username, image, createdAt }: PropfileProps) => {
  return (
    <div className={classes.author}>
      <div className={classes.author_info}>
        <div className={classes.username}>{username}</div>
        <div className={classes.date}>
          {createdAt ? format(new Date(createdAt), 'MMMM dd, yyyy') : null}
        </div>
      </div>
      <div className={classes.avatar}>
        <img src={image ? image : avatar} alt="avatar"></img>
      </div>
    </div>
  );
};

export default Profile;
