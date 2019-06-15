import * as React from "react";
import "./App.css";

enum Pages {
  Init,
  NotFound
}

interface IState {
  page: Pages;
}

class App extends React.Component<{}, IState> {
  public state: IState = { page: Pages.Init };
  constructor(props: {}) {
    super(props);
  }

  public render() {
    if (this.state.page === Pages.Init) {
      return (
        <button onClick={this.handleLinkClick.bind(this, Pages.NotFound)}>
          ゲームスタート
        </button>
      );
    }

    // 該当ページなし
    return <div>Sorry. Error</div>;
  }
  private handleLinkClick(newPage: Pages): void {
    this.setState(state => ({
      page: newPage
    }));
  }
}

export default App;
