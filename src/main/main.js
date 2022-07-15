import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Search from "../Components/Search/Search";
import Gifs from "../Components/Gifs/Gifs";
import Loading from "../Components/Loader/Loader";

import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../Components/Theme/Theme";

import logoLight from "../Components/assets/logo-desktop.svg";
import logoDark from "../Components/assets/logo-mobile-modo-noct.svg";

import "../main/main.css";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

export default function Main() {
  const { state } = useContext(AppContext);

  const [theme, setTheme] = useState("Light");

  const RESULT = "Resultados de la busqueda";
  const SEARCH = "Busca tus GIFS favoritos";
  const ERROR = "No se encontraron tus GIFS";

  const handleTheme = (e) => {
    if (theme === "Light") {
      setTheme("Dark");
    } else {
      setTheme("Light");
    }
  };

  return (
    <ThemeProvider
      className="main-container"
      theme={theme === "Light" ? lightTheme : darkTheme}
    >
      <StyledApp className="styled-container">
        <section className="main-header-container">
          <header className="header-container">
            <img className="logo" src={logoLight} alt="Logo" />
            <img className="logoDark" src={logoDark} alt="logo Dark" />
            <button onClick={() => handleTheme()} className="theme-button">
              <h3 className="button-text">
                {theme === "Light" ? "Dark" : "Light"} Mode{" "}
              </h3>
            </button>
          </header>
          <h1 className="search-title">
            ¡Inspirate y busca los mejores <strong>GIFS</strong>!
          </h1>
        </section>
        <Search />
        <div className="results-title">
          <h5>
            {state.error ? (
              ERROR
            ) : state.gifs.length > 0 ? (
              state.loadedGifs ? (
                RESULT
              ) : (
                <Loading />
              )
            ) : (
              SEARCH
            )}
          </h5>
        </div>
        <Gifs />
      </StyledApp>
      <GlobalStyles />
    </ThemeProvider>
  );
}
