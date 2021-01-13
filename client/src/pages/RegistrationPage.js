import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const RegistrationPageContainer = styled.div``;
const RegistrationForm = styled.form`
  border: solid 1px red;
`;
const RegistrationInput = styled.input``;

const RegistrationPage = () => (
  <RegistrationPageContainer>
    <section>
      <h2>Das ist die Registratur-Seite 🤓</h2>
    </section>
    <div>
      <RegistrationForm
      //   onSubmit={handleSubmit}
      >
        <RegistrationInput
          type="text"
          placeholder="Username"
          required="required"
          //   value={userName}
          //   onChange={handleUserNameChange}
        />
        <RegistrationInput
          type="password"
          placeholder="Passwort"
          required="required"
          //   value={password}
          //   onChange={handlePasswordChange}
        />
        <button>Registrieren</button>
      </RegistrationForm>
    </div>
    <div>
      <Link to="/upload">
        <button>Ich bin Sven Lohmann, lasst mich rein!</button>
      </Link>
    </div>
  </RegistrationPageContainer>
);

export default RegistrationPage;
