import * as React from "react";
import Game from "./Game";

enum Pages {
  Init,
  GameStart,
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
        <div>
          <h1>夢月ロアのタイピングなのだ！</h1>
          <button onClick={this.handleLinkClick.bind(this, Pages.GameStart)}>
            ゲームスタート
          </button>
        </div>
      );
    } else if (this.state.page === Pages.GameStart) {
      return (
        <div>
          <button onClick={this.handleLinkClick.bind(this, Pages.Init)}>
            タイトルに戻る
          </button>
          <Game />
        </div>
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
