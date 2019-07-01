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
        <div className="tile is-parent">
          <article className="tile is-child notification is-danger">
            <div className="main-flex-container">
              <div className="sub-flex-container">
                <h1 className="game-title">
                  夢月ロアのタイピングゲームなのだ！
                </h1>
                <button
                  className="button is-medium start-button"
                  onClick={this.handleLinkClick.bind(this, Pages.GameStart)}
                >
                  スタートなのだ〜!!
                </button>
              </div>
              <img src="https://wikiwiki.jp/nijisanji/?plugin=ref&page=%E5%A4%A2%E6%9C%88%E3%83%AD%E3%82%A2&src=roa.png&rev=d2cbddcc4631567f159815f92bbc5425" />
            </div>
            {/* TODO src差し替え */}
          </article>
        </div>
      );
    } else if (this.state.page === Pages.GameStart) {
      return (
        <div>
          <Game />

          <button
            className="button"
            onClick={this.handleLinkClick.bind(this, Pages.Init)}
          >
            ← タイトルに戻る
          </button>
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
