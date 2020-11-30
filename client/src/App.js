import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Page from "./pages/Page";
import UploadPage from "./pages/UploadPage";
import TaggingPage from "./pages/TaggingPage";
import GalleryPage from "./pages/GalleryPage";

function App() {
  return (
    <div className="App">
      <Page />
      <Router>
        <Switch>
          <Route exact path="/">
            <UploadPage />
          </Route>
          <Route exact path="/tagging">
            <TaggingPage />
          </Route>
          <Route exact path="/gallery">
            <GalleryPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
