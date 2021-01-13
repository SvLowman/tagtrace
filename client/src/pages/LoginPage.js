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
  const [password, setPassword] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  console.log(userName);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  console.log(password);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await getLoginData(userName, password);
  };

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
            value={password}
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
