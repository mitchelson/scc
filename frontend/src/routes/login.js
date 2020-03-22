import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Registro from '../pages/Registro';

export default function Routes() {
  return (
    <Switch>
      <Route path="/*" component={Login} />
    </Switch>
  );
}