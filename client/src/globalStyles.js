import { createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`

*, *::before, *::after{
    box-sizing: border-box;
}

:root {
    --header: #0d0c18;
    --background: #161528;
    --image-container: #201f29;
    --light: #dce4cc;
    --active: #4caa59;
    --active-gradient: #397f43;
    --tagfont: 'Josefin Sans', sans-serif;
    --textfont: 'Montserrat', sans-serif;
}

body {
    background: var(--background);
    color: var(--light);
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    ::-webkit-scrollbar {
    width: 0 !important;
    background-color: transparent;
  }
}

button {
    background: transparent;
    color: var(--light);
    font-family: var(--textfont);
    border: solid 1px var(--light);
    border-radius: 1rem;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
}

footer {
    visibility: hidden;
}
`;

export default GlobalStyle;
