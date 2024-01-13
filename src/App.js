import logo from "./logo.svg";
import Result from "./pages/Result";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import ScoreCard from "./components/ScoreCard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import FileInfo from "./pages/FileInfo";
import { supabase } from "./client";
import Logout from "./pages/Logout";
import MarksScheme from "./pages/MarksScheme";
import HomePage from "./pages/HomePage";
import UploadedFiles from "./pages/uploadedFiles";
import { useEffect, useState } from "react";
import { DataProvider } from "./DataContext";

function App() {
  const [token, setToken] = useState(false);

  const toLogin = () => {
    window.location.replace("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let data = JSON.parse(localStorage.getItem("token"));

      setToken(data);
    }
  }, []);

  useEffect(() => {
    console.log("token2", token);
  }, [token]);

  return (
    <div>
      <DataProvider>
        <Router>
          <Switch>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>

            {token ? (
              <Route exact path="/files">
                <UploadedFiles />
              </Route>
            ) : (
              <div></div>
            )}

            {token ? (
              <Route exact path="/score">
                <ScoreCard />
              </Route>
            ) : (
              <div></div>
            )}

            {token ? (
              <Route exact path="/logout">
                <Logout />
              </Route>
            ) : (
              <div></div>
            )}

            {token ? (
              <Route exact path="/upload">
                <Upload />
              </Route>
            ) : (
              <div></div>
            )}

            {token ? (
              <Route exact path="/files">
                <UploadedFiles />
              </Route>
            ) : (
              <div></div>
            )}

            {token ? (
              <Route exact path="/marks">
                <MarksScheme />
              </Route>
            ) : (
              <div></div>
            )}

            {token ? (
              <Route exact path="/file-info">
                <FileInfo />
              </Route>
            ) : (
              <div></div>
            )}

            {token ? (
              <Route exact path="/result">
                <Result />
              </Route>
            ) : (
              <div></div>
            )}
          </Switch>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
