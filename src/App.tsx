import * as React from 'react';
import './App.css';

import logo from './logo.svg';

enum Pages {
  Init,
}

interface IState {
  page: Pages
}

class App extends React.Component<{}, IState> {
  public state: IState = { page: Pages.Init};
  constructor(props: {}){
    super(props);
  }

  public render() {
    if (this.state.page === Pages.Init) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        </div>
      );
    } 

    // 該当ページなし
    return (
      <div>Sorry. Error</div>
    )
  }
}

export default App;