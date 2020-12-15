import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// import Page from "./pages/Page";
import PageContainer from "./components/PageContainer";
import TopElement from "./components/TopElement";
import UploadPage from "./pages/UploadPage";
import TaggingPage from "./pages/TaggingPage";
import GalleryPage from "./pages/GalleryPage";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <PageContainer>
            <TopElement />
            <Switch>
              <Route exact path="/">
                <UploadPage />
              </Route>
              <Route exact path="/tagging">
                <TaggingPage
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  allImages={allImages}
                  setAllImages={setAllImages}
                />
              </Route>
              <Route exact path="/gallery">
                <GalleryPage
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  allImages={allImages}
                  setAllImages={setAllImages}
                />
              </Route>
            </Switch>
            <BottomNav />
          </PageContainer>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
