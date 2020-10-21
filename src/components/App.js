import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as Poke from './PokeList';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Poke.ListView />
        </Route>
        <Route path="/:id">
          <Poke.View />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
