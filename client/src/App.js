// COMPONENTS
import { Home, Aside, Footer } from "./Components";

// STYLES
import "./App.css";

// REACT-ROUTER-DOM
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const localStorageProfile = await JSON.parse(
        localStorage.getItem("profile")
      );
      if (localStorageProfile?.user) {
        dispatch({ type: "SET_USER", payload: localStorageProfile });
      }
    };

    checkUser();
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Aside />
        <Switch>
          <Route path="/">
            <Home isUploading={isUploading} setIsUploading={setIsUploading} />
          </Route>
        </Switch>
        <Footer isUploading={isUploading} setIsUploading={setIsUploading} />
      </Router>
    </div>
  );
}

export default App;
