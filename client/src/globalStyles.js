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
    margin: 0;
    background: var(--background);
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    color: var(--light);
}

button {
    background: transparent;
    color: var(--light);
    font-family: var(--textfont);
    padding: 0.5rem 0.8rem;
    border: solid 1px var(--light);
    border-radius: 1rem;
    cursor: pointer;
}
`;

export default GlobalStyle;
