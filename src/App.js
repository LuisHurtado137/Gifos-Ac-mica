import Main from "./main/main";
import AppContextProvider from "./context/AppContext.js";

import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <Main />
    </AppContextProvider>
  );
}
export default App;
