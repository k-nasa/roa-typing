import * as React from "react";

enum GameState {
  Ready,
  InAction,
  Finish
}

interface IState {
  gameState: GameState;
}

export default class Game extends React.Component<{}, IState> {
  public state: IState = { gameState: GameState.Ready };

  public render() {
    return (
      <div>
        <p>ゲーム画面なのだ</p>
      </div>
    );
  }
}
