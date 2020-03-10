import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Militar from '../pages/Militar';
import Viaturas from '../pages/Viaturas';
import Relatorios from '../pages/Relatorios';

export default function Routes() {
  return (
    <Switch>
      <Route path="/inicio" exact component={Main} />
      <Route path="/militar" exact component={Militar} />
      <Route path="/viaturas" exact component={Viaturas} />
      <Route path="/relatorios" exact component={Relatorios} />
    </Switch>
  );
}