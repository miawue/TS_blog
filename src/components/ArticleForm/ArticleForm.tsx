import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import Field from '../Field';
import Button from '../Button/Button';
import realWorldService from '../../service/realworld-service';
import { inputs, getTagsFieldData } from './constants';

import { ArticleKey, ArticleModel } from '../../types';
import { RootState } from '../../redux/store';
import { btnText } from '../Button/constants';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import classes from './article-form.module.scss';

const ArticleForm = ({ token, currentSlug }: { token: string; currentSlug: string }) => {
  const [article, setArticle] = useState<ArticleModel | null>(null);
  const [tagFields, setTagFields] = useState([getTagsFieldData()]);
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (currentSlug) {
      setTagFields([]);
      setLoading(true);
      realWorldService
        .getSingleArticle(currentSlug)
        .then((result) => {
          setArticle(result.article);
          result.article.tagList.map((tag: string) =>
            setTagFields((prev) => [...prev, getTagsFieldData(tag)])
          );
        })
        .finally(() => setLoading(false));
    } else {
      setTagFields([getTagsFieldData()]);
      setArticle(null);
    }
  }, [currentSlug]);

  const onSubmit = (data: any) => {
    const fetchedData = {
      body: article?.body,
      description: data?.description?.trim(),
      title: data?.title?.trim(),
      tagList: Object.keys(data)
        .reduce(
          (acc: any, key: string) => (key.includes('tag') ? [...acc, data[key]?.trim()] : acc),
          []
        )
        .filter((tag: string) => tag !== ''),
    };

    if (currentSlug) {
      realWorldService
        .updateArticle(fetchedData, token, currentSlug)
        .then(({ article }) => navigate(`/articles/${article.slug}`));
    } else {
      realWorldService
        .createArticle(fetchedData, token)
        .then(({ article }) => navigate(`/articles/${article.slug}`));
    }

    reset();
  };

  let navigate = useNavigate();

  const handleButtonAddClick = () => {
    setTagFields((prev) => [...prev, getTagsFieldData()]);
  };

  const handleButtonDeleteClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement;
    setTagFields(tagFields.filter((tag) => tag.name !== target.id));
  };

  return (
    <Spin tip="Please, wait..." spinning={isLoading}>
      <div className={classes.wrapper}>
        <div className={classes.title}>{currentSlug ? 'Edit article' : 'Create new article'}</div>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {inputs.map(({ htmlTag, label, name, type, placeholder }) => {
            return (
              <label key={name} className={classes.label}>
                <div className={classes.text}>{label}</div>
                <Field
                  htmlTag={htmlTag}
                  name={name}
                  placeholder={placeholder}
                  type={type}
                  //@ts-ignore
                  // ref={register}
                  register={register(name, {
                    required: `${label} is required`,
                  })}
                  defaultValue={
                    article
                      ? article[name as ArticleKey.Title | ArticleKey.Body | ArticleKey.Description]
                      : ''
                  }
                />

                <div className={classes.error}>{errors[name]?.message}</div>
              </label>
            );
          })}
          <div className={classes.tag_container}>
            {tagFields.map(({ htmlTag, type, name, defaultValue }, index) => (
              <div key={name} className={classes.tag_wrapper}>
                <Field
                  htmlTag={htmlTag}
                  name={name}
                  width={300}
                  type={type}
                  register={register(name, {
                    minLength: {
                      value: 2,
                      message: 'Must be minimum 2 symbols',
                    },
                    maxLength: {
                      value: 25,
                      message: 'Must be maximum 25 symbols',
                    },
                    onChange: (e) => e.target.value.trim() !== '',
                  })}
                  defaultValue={currentSlug && defaultValue}
                />

                <Button id={name} design="tag_delete" onClick={handleButtonDeleteClick}>
                  {btnText.delete}
                </Button>

                {index === tagFields.length - 1 && (
                  <Button design="info" onClick={handleButtonAddClick}>
                    {btnText.addTag}
                  </Button>
                )}
                <div className={classes.error}>{errors[name]?.message}</div>
              </div>
            ))}
          </div>
          <Button design="primary" type="submit">
            {btnText.send}
          </Button>
        </form>
      </div>
    </Spin>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    token: state.userData.token,
  };
};

export default connect(mapStateToProps)(ArticleForm);
