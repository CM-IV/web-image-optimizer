import { Route, Switch, Router } from "wouter-preact"
import Home from "./pages";
import TestPage from "./pages/testPage";
import { NotFound } from "./pages/_404";
import { useState, useEffect } from "preact/hooks";



const App = () => {

  // returns the current hash location in a normalized form
  // (excluding the leading '#' symbol)
  const currentLocation = () => {
    return window.location.hash.replace(/^#/, "") || "/";
  };

  const navigate = (to: string) => (window.location.hash = to);

  const useHashLocation = () => {
    const [loc, setLoc] = useState(currentLocation());

    useEffect(() => {
      // this function is called whenever the hash changes
      const handler = () => setLoc(currentLocation());

      // subscribe to hash changes
      window.addEventListener("hashchange", handler);
      return () => window.removeEventListener("hashchange", handler);
    }, []);

    return [loc, navigate];
  };

  return (
    /*@ts-ignore*/
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/test-page" component={TestPage}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  )
}

export default App
