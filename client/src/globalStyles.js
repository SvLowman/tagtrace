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
    --active: #65c542;
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
    color: rebeccapurple;
}
`;

export default GlobalStyle;
