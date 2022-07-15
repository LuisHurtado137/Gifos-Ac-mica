import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  fontColor: "#572EE5",
  border: "2px solid #6809E1",
  background: "#fff",
  headerIconChange: "none",
  headerIcon: "inline",
  scaleImage: "scaleX(1)",
};
export const darkTheme = {
  body: "#373737",
  fontColor: "#fff",
  border: "2px solid #fff",
  background: "#373737",
  secondary: "#212121",
  headerIconChange: "inline",
  headerIcon: "none",
  scaleImage: "scaleX(-1) ",
};

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${(props) => props.theme.body}
    }
    .button-text {
        color: ${(props) => props.theme.fontColor}
    }
    
    .theme-button {
        border: ${(props) => props.theme.border} 
    }
    .theme-button {
        background: ${(props) => props.theme.background}
    }
   .theme-button{
       transform = ${(props) => props.theme.scaleImage}
    }
    .results-title {
        color: ${(props) => props.theme.fontColor}
    }
    .results {
        background: ${(props) => props.theme.secondary}
    }
   .logoDark {
       display: ${(props) => props.theme.headerIconChange}
    }
   .logo {
       display: ${(props) => props.theme.headerIcon}
    }
`;
