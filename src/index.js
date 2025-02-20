import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '../src/components/GlobalStyles';
import { Provider } from 'react-redux';
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <Provider store={store}>
        <App />
      </Provider>
    </GlobalStyles>
  </React.StrictMode>,
);
reportWebVitals();
