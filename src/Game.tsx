import * as React from "react";

enum GameState {
  Ready,
  InAction,
  Finish
}

interface IState {
  gameState: GameState;
}

const Game = () => {

  public render() {
    return (
      <div>
        <p>ゲーム画面なのだ</p>
      </div>
    );
  }
}
