import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/home/Home";
import NewStory from "./pages/new-story/NewStory";
import Topics from "./pages/topics/Topics";
import Read from "./pages/read/Read";
import Search from "./pages/search/Search";
import Stats from "./pages/stats";
import Stories from "./pages/stories";
import Protected from "./functions/Protected";

const routes = [
  { path: "/", component: Home },
  { path: "/new-story", component: NewStory, isProtected: true },
  { path: "/topics", component: Topics },
  { path: "/read/:slug", component: Read },
  { path: "/search", component: Search },
  { path: "/stats", component: Stats, isProtected: true },
  { path: "/stories", component: Stories, isProtected: true },
];

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        {routes.map((route, key) => (
          <Route
            exact
            path={route.path}
            key={key}
            render={(props) => (
              <>
                {route.isProtected ? (
                  <Protected>
                    <route.component {...props} />
                  </Protected>
                ) : (
                  <route.component {...props} />
                )}
              </>
            )}
          ></Route>
        ))}
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
