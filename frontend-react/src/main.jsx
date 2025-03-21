import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import App from './App.jsx';
import "./CSS/style.module.css";
import "./CSS/login.module.css";
import "./index.css";
import { UserProvider } from './store/userContext.jsx';
import './i18n'; // Import cấu hình i18n

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
          <App />
      </UserProvider>
    </Provider>
  </StrictMode>
);
