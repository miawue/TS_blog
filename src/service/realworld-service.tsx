import { ArticleKey, ArticleModel, PartialUser } from '../types';

class RealworldSerivice {
  _apiBase: string = 'https://cirosantilli-realworld-next.herokuapp.com/api';

  async getResource(url: string, options?: RequestInit) {
    const response = await fetch(`${url}`, options);

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(responseData));
    }
    return responseData;
  }

  getArticles = (limit: number, offset: number, token?: string) => {
    return this.getResource(`${this._apiBase}/articles?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  };

  getSingleArticle = (slug: string, token?: string) => {
    return this.getResource(`${this._apiBase}/articles/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  };

  loginExistUser = (user: Pick<PartialUser, 'email'> & { password: string }) => {
    return this.getResource(`${this._apiBase}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });
  };

  registerNewUser = (user: Pick<PartialUser, 'username' | 'email'> & { password: string }) => {
    return this.getResource(`${this._apiBase}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });
  };

  getCurrentUser = (token: string) => {
    return this.getResource(`${this._apiBase}/user`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  };

  updateCurrentUser = (user: PartialUser & { token: string }, token?: string) => {
    return this.getResource(`${this._apiBase}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user: { ...user, token } }),
    });
  };

  createArticle = (
    article: Pick<
      ArticleModel,
      ArticleKey.Title | ArticleKey.Description | ArticleKey.Body | ArticleKey.TagList
    >,
    token?: string
  ) => {
    return this.getResource(`${this._apiBase}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article }),
    });
  };

  updateArticle = (
    article: Pick<
      ArticleModel,
      ArticleKey.Title | ArticleKey.Description | ArticleKey.Body | ArticleKey.TagList
    >,
    token?: string,
    slug?: string
  ) => {
    return this.getResource(`${this._apiBase}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article }),
    });
  };

  deleteteArticle = (token?: string, slug?: string) => {
    return this.getResource(`${this._apiBase}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  };

  favoriteArticle = (slug?: string, token?: string) => {
    return this.getResource(`${this._apiBase}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  };

  unfavoriteArticle = (slug?: string, token?: string) => {
    return this.getResource(`${this._apiBase}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  };
}

const realWorldService = new RealworldSerivice();

export default realWorldService;
