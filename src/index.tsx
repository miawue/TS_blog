import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './redux/store';

import 'antd/dist/antd.min.css';
import '../src/style/reset.scss';
import '../src/style/fonts.scss';

import '../src/style/style.scss';

import '../src/style/fonts.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);
