import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../Theme/Theme.js";

import ilustracion from "../assets/ilustra_header.svg";
import lupa from "../assets/icon-search.svg";
import close from "../assets/cancel.png";

import "../Search/Search.css";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

export default function Search() {
  const { handlerQuery } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [theme, setTheme] = useState("Light");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handlerQuery(query);
  };

  const handleClear = () => {
    setQuery("");
  };

  // const handlerClick = () => {
  //     if(query === ""){
  //         alert("ingresa una palabra clave para buscar tus gifs")
  //     } else {
  //       setQuery("")
  //     }

  // }

  const searchSuggestions = (q) => {
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=RuNm5Y0TXMMsxF2tVWEYVkzGcuITomlk&q=${q}&limit=6`;
    fetch(URL)
      .then((response) => response.json())
      .then((response) => setSuggestions(response.data));
  };

  useEffect(() => {
    searchSuggestions(query);
  }, [query]);

  useEffect(() => {
    if (query.length === 0) {
      handlerQuery(query);
    }
  }, [query, handlerQuery]);

  const searchData = (
    <datalist id="search-gifs" className="suggestions">
      {suggestions.length > 0 &&
        suggestions.map((item, index) => {
          return (
            <option
              className="suggestionOption"
              key={index}
              value={item.title}
            ></option>
          );
        })}
    </datalist>
  );

  const handleTheme = (e) => {
    if (theme === "Light") {
      setTheme("Dark");
    } else {
      setTheme("Light");
    }
  };

  return (
    <ThemeProvider
      theme={theme === "Light" ? lightTheme : darkTheme}
      onChange={handleTheme}
    >
      <StyledApp
        className={`container-search-gifs ${
          theme === "Light" ? "darkTheme" : "lightTheme"
        }`}
      >
        <form onSubmit={handleOnSubmit}>
          <img src={ilustracion} alt="ilustracion" className="search-image" />
          <div className="input-container">
            <input
              onChange={handleChange}
              onSubmit={(event) => handleOnSubmit(event, "input")}
              list="search-gifs"
              value={query}
              placeholder="Busca GIFS"
              className="search-input"
            />
            {query.length > 0 ? (
              <div className="searchButton" onClick={handleClear}>
                <img src={close} alt="close" className="searchBarIcon" />
              </div>
            ) : (
              <div
                className="searchButton"
                onClick={(event) => handleOnSubmit(event, "input")}
              >
                <img src={lupa} alt="lupa" className="searchBarIcon" />
              </div>
            )}
          </div>
          {searchData}
        </form>
      </StyledApp>
      <GlobalStyles />
    </ThemeProvider>
  );
}
