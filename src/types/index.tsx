interface UserModel {
  email?: string;
  token?: string;
  username?: string;
  bio?: string;
  image?: string | null;
  following?: boolean;
}

export type PartialUser = Partial<UserModel>;

export type ProfileType = Omit<UserModel, 'email' | 'token'> & { following: boolean };

export enum ArticleKey {
  Slug = 'slug',
  Title = 'title',
  Description = 'description',
  Body = 'body',
  TagList = 'tagList',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Favorited = 'favorited',
  FavoritesCount = 'favoritesCount',
  Author = 'author',
}

export interface ArticleModel {
  [ArticleKey.Slug]: string;
  [ArticleKey.Title]: string;
  [ArticleKey.Description]: string;
  [ArticleKey.Body]?: string;
  [ArticleKey.TagList]?: Array<string>;
  [ArticleKey.CreatedAt]: string;
  [ArticleKey.UpdatedAt]?: string;
  [ArticleKey.Favorited]?: boolean;
  [ArticleKey.FavoritesCount]: number;
  [ArticleKey.Author]: ProfileType;
}

export enum FormType {
  SignIn = 'sign-in',
  SignUp = 'sign-up',
  Profile = 'profile',
}
