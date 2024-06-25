import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change for React 18
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // createRoot is used for React 18
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  reportWebVitals(console.log); // Pass a function to log results or send to an analytics endpoint
}
