import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/styles/tailwind.css";


// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import RecipeSearch from "views/Edamam/RecipeSearch";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/Index" exact component={Index} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/recipe-search" exact component={RecipeSearch} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
