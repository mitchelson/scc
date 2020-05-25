import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
//Verifica se o usuário está logado evitando de acessar diretamente as url's
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;
