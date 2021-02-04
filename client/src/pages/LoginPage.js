import { React, useState } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { getLoginData } from "../utils/api";

const LoginPageContainer = styled.div``;
const LoginForm = styled.form`
  border: solid 1px red;
`;
const LoginInput = styled.input``;

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordFromDatabase, setPasswordFromDatabase] = useState("");

  // useEffect(() => {
  //   const password = async function getLoginData(userName);
  //   setPasswordFromDatabase(password);
  // }, []);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  console.log(userName);

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };
  console.log(passwordInput);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = await getLoginData(userName, passwordInput);
    setPasswordFromDatabase(password);
    console.log("submitting:", userName, passwordInput);
    console.log("receiving:", passwordFromDatabase);
  };
  console.log(passwordFromDatabase);

  return (
    <LoginPageContainer>
      <section>
        <h2>Das ist die Login-Seite 😖</h2>
      </section>
      <div>
        <LoginForm onSubmit={handleSubmit}>
          <LoginInput
            type="text"
            placeholder="Username"
            required="required"
            value={userName}
            onChange={handleUserNameChange}
          />
          <LoginInput
            type="password"
            placeholder="Passwort"
            required="required"
            value={passwordInput}
            onChange={handlePasswordChange}
          />
          <button type="submit">Login</button>
          <Link to="/registration">
            <button>Registrieren</button>
          </Link>
        </LoginForm>
      </div>
      <div>
        <Link to="/upload">
          <button>Ich bin Sven Lohmann, lasst mich rein!</button>
        </Link>
      </div>
    </LoginPageContainer>
  );
};

export default LoginPage;
