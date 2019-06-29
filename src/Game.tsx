import * as React from "react";
import { useEffect, useState } from "react";

enum GameState {
  Ready,
  InAction,
  Finish
}

const Game = () => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
  }, []);

  const handleKeydown = (event: KeyboardEvent) => {
    // tslint:disable-next-line:no-console
    console.log(event);

    switch (gameState) {
      case GameState.Ready:
        if (event.key === "Enter") {
          setGameState(GameState.InAction);
        }
        break;
      case GameState.InAction:
        if (event.key === "Escape") {
          setGameState(GameState.Ready);
        }
        break;
    }
  };

  const [gameState, setGameState] = useState<GameState>(GameState.Ready);

  return (
    <div>
      <p>ゲーム画面なのだ</p>
      <p>制限時間 : {"dummuy"}</p>
      <p>スコア: {"dummuy"}</p>
      <GameInner gameState={gameState} />
    </div>
  );
};
interface IProps {
  gameState: GameState;
}

const GameInner = ({ gameState }: IProps) => {
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
};
export default Game;
