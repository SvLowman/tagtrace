import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Page from "./pages/Page";
import UploadPage from "./pages/UploadPage";
import TaggingPage from "./pages/TaggingPage";
import GalleryPage from "./pages/GalleryPage";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
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
          <BottomNav />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
