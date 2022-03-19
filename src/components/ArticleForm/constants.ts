import { v4 as uuidv4 } from 'uuid';
import { ArticleKey } from '../../types';

export const articleType = { create: 'create', edit: 'edit' };

export const title = {
  htmlTag: 'input',
  name: ArticleKey.Title,
  label: 'Title',
  type: 'text',
  placeholder: 'Title',
};

export const shortDescription = {
  htmlTag: 'input',
  name: ArticleKey.Description,
  label: 'Short description',
  type: 'text',
  placeholder: 'Title',
};

export const textArea = {
  htmlTag: 'textarea',
  name: ArticleKey.Body,
  label: 'Text',
  placeholder: 'Text',
  type: '',
};

export const inputs = [title, shortDescription, textArea];

export const getTagsFieldData = (defaultValue?: string) => ({
  htmlTag: 'input',
  type: 'text',
  name: `tag_${uuidv4()}`,
  defaultValue,
});
