import React from "react";
import PropTypes from "prop-types";

// import { Header } from "./Header";
// import "./page.css";

const Page = ({ user, onLogin, onLogout, onCreateAccount }) => (
  <article>
    {/* <Header
      user={user}
      onLogin={onLogin}
      onLogout={onLogout}
      onCreateAccount={onCreateAccount}
    /> */}

    <section>
      <h2>Hello World! 😁</h2>
    </section>
  </article>
);
Page.propTypes = {
  user: PropTypes.shape({}),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
};

Page.defaultProps = {
  user: null,
};

export default Page;
