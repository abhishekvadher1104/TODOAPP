import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/login.scss';
import './styles/signup.scss';
import './styles/home.scss';
import './styles/Header.scss';
import './styles/Loader.scss';
import './styles/Todoitem.scss';
import { createContext } from 'react';

export const context = createContext({ isAuthenticated: false })

// Define your server endpoint globally
export const server = "http://localhost:4000/api/v1";

// Get the root element from the DOM
const rootElement = document.getElementById('root');

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false)
  const [user,setUser] = useState({})
  return (
    <>
      <context.Provider
        value={{
          isAuthenticated,setIsAuthenticated,
          loading, setLoading,
          user,setUser
        }}>
        <App />
      </context.Provider>
    </>
  )
}

// Check if the root has already been initialized to avoid duplicate `createRoot` calls
if (!rootElement._reactRootContainer) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppWrapper />
    </StrictMode>
  );
}

// createContext ni help thi game te variable define thay and appne Context.Provider thi wrap up kari daiye etle te context create karyo tene akhi app folder ma game tya access kari sakiye
