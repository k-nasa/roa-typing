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
const GameInner = ({ gameState }: IState) => {
  if (gameState === GameState.Ready) {
    return <p>Enterキーを押してゲームスタート</p>;
  } else if (gameState === GameState.InAction) {
    return <p>game main</p>;
  } else if (gameState === GameState.Finish) {
    return <p>result 画面表示</p>;
  } else {
    // tslint:disable-next-line:no-unused-variable
    const check: never = gameState;
    return <p>error {check}</p>;
  }
}
