import { Route, Switch, Router } from "wouter-preact";
import { Home } from "./pages/index";
import { ShrinkPhotoPage } from "./pages/shrinkPhoto";
import { ConvertPhotoPage } from "./pages/convertPhoto";
import { NotFound } from "./pages/_404";
import { useState, useEffect } from "preact/hooks"


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
    
    //Need history observer for hash based routes
    //Weird type error here
    /*@ts-ignore*/
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home}></Route>
        <Route path="/optimize" component={ShrinkPhotoPage}></Route>
        <Route path="/convert" component={ConvertPhotoPage}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>

  )

}

export default App;