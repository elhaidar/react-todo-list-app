/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export const ThemeContext: any = createContext(null);

function App() {
  const [currentTheme, setCurrentTheme] = useState<boolean>(false);
  const switchTheme = () => {
    setCurrentTheme(!currentTheme);
    localStorage.currentTheme = !currentTheme;
  };

  useEffect(() => {
    try {
      setCurrentTheme(JSON.parse(localStorage.currentTheme));
    } catch (error) {
      setCurrentTheme(true);
      localStorage.currentTheme = true;
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeContext.Provider
        value={{
          currentTheme,
          switchTheme,
        }}
      >
        <AppRouter />
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
