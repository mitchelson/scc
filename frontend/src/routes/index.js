import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Militar from '../pages/Militar';
import Login from '../pages/Login';
import Viaturas from '../pages/Viaturas';
import Relatorios from '../pages/Relatorios';
import Sair from '../pages/Sair';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/militar" exact component={Militar} />
      <Route path="/viaturas" exact component={Viaturas} />
      <Route path="/relatorios" exact component={Relatorios} />
      <Route path="/sair" exact component={Sair} />
    </Switch>
  );
}