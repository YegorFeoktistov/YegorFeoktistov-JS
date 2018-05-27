import { Provider } from 'mobx-react';
import * as React from 'react';
import './App.css';
import { BattlefieldComponent } from './components/battlefieldComponent';
import { bfStore } from "./stores/battlefieldStore";

class App extends React.Component {
  public render() {
    return (
      <Provider bfStore={bfStore}>
        <div className="App">
          <BattlefieldComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
