import { ReactQueryDevtools } from "react-query/devtools";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import PageContainer from "./components/PageContainer";
import TopElement from "./components/TopElement";
import SplashPage from "./pages/SplashPage";
import UploadPage from "./pages/UploadPage";
import TaggingPage from "./pages/TaggingPage";
import GalleryPage from "./pages/GalleryPage";
import BottomNav from "./components/BottomNav";
import { getImageObj } from "./utils/api";
import { useQuery } from "react-query";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(true);

  useEffect(() => {
    setTimeout(() => setPage(false), 4000);
  }, []);

  const userName = "sven";

  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("allImages", () => getImageObj(userName));

  return (
    <>
      <Router>
        <div className="App">
          <GlobalStyle />
          <PageContainer>
            {!page && <TopElement />}
            <Switch>
              <Route exact path="/">
                {page ? <SplashPage /> : <UploadPage />}
              </Route>
              <Route path="/tagging">
                <TaggingPage
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  userData={userData}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                  refetch={refetch}
                />
              </Route>
              <Route path="/gallery">
                <GalleryPage
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  userData={userData}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                />
              </Route>
            </Switch>
            {!page && <BottomNav />}
          </PageContainer>
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </Router>
    </>
  );
}

export default App;
