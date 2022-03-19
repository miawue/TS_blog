import { FormType } from '../../types';
import { object, string, ref, boolean } from 'yup';

export const username = {
  id: 'username',
  label: 'Username',
  type: 'text',
  name: 'username',
  placeholder: 'Username',
};
export const email = {
  id: 'email',
  label: 'Email address',
  type: 'email',
  name: 'email',
  placeholder: 'Email address',
};
export const newPassword = {
  id: 'newPassword',
  label: 'New password',
  type: 'password',
  name: 'newPassword',
  placeholder: 'New password',
};
export const password = {
  id: 'password',
  label: 'Password',
  type: 'password',
  name: 'password',
  placeholder: 'Password',
};
export const repeatPassword = {
  id: 'repeatPassword',
  label: 'Repeat Password',
  type: 'password',
  name: 'repeatPassword',
  placeholder: 'Password',
};
export const avatar = {
  id: 'avatar',
  label: 'Avatar image (url)',
  type: 'url',
  name: 'image',
  placeholder: 'Avatar image',
};
export const checkbox = {
  id: 'checkbox',
  label: 'I agree to the processing of my personal information',
  name: 'checkbox',
  type: 'checkbox',
  placeholder: '',
};

export const linkText = {
  [FormType.SignIn]: 'Sign Up',
  [FormType.SignUp]: 'Sign In',
};
export const linkUrl = {
  [FormType.SignIn]: FormType.SignUp,
  [FormType.SignUp]: FormType.SignIn,
};

export const bottomText = {
  [FormType.SignIn]: 'Don’t have an account?',
  [FormType.SignUp]: 'Already have an account?',
};

export const inputsData = {
  [FormType.SignIn]: [email, password],
  [FormType.SignUp]: [username, email, password, repeatPassword, checkbox],
  [FormType.Profile]: [username, email, newPassword, avatar],
};

export const titles = {
  [FormType.SignIn]: 'Sign In',
  [FormType.SignUp]: 'Create new account',
  [FormType.Profile]: 'Edit Profile',
};

export const schema = {
  [FormType.SignIn]: object({
    [email.name]: string().email().required(`${email.label} is required`),
    [password.name]: string()
      .min(6, 'Must be minimum 6 symbols')
      .max(40, 'Must be maximum 40 symbols')
      .required(`${password.label} is required`),
  }),
  [FormType.SignUp]: object({
    [username.name]: string()
      .min(3, 'Must be minimum 3 symbols')
      .max(20, 'Must be maximum 20 symbols')
      .required(`${username.label} is required`),
    [email.name]: string().email().required(`${email.label} is required`),
    [password.name]: string()
      .min(6, 'Your password needs to be at least 6 characters.')
      .max(40, 'Must be maximum 40 symbols')
      .required(`${password.label} is required`),
    [repeatPassword.name]: string()
      .oneOf([ref('password'), null], 'Passwords must match')
      .required(`${repeatPassword.label} is required`),
    [checkbox.name]: boolean().oneOf([true], 'Must be checked').required(),
  }),
  [FormType.Profile]: object({
    [username.name]: string()
      .nullable()
      .notRequired()
      .min(3, 'Must be minimum 3 symbols')
      .max(20, 'Must be maximum 20 symbols'),
    [email.name]: string().email(),
    [avatar.name]: string().url().nullable(),
    [newPassword.name]: string(),
  }),
};
