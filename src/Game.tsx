import * as React from "react";
import { useEffect, useState } from "react";

enum GameState {
  Ready,
  InAction,
  Finish
}

const Game = () => {
  useEffect(() => {
    addEventListener("keydown", handleKeydown);

    return () => removeEventListener("keydown", handleKeydown);
  });

  const handleKeydown = (event: KeyboardEvent) => {
    switch (gameState) {
      case GameState.Ready:
        if (event.key === " ") {
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

      <p>やり直す(Escキー)</p>
    </div>
  );
};
interface IProps {
  gameState: GameState;
}

const GameInner = ({ gameState }: IProps) => {
  if (gameState === GameState.Ready) {
    return <p>スペースキーを押してゲームスタート</p>;
  } else if (gameState === GameState.InAction) {
    return <GameMain />;
  } else if (gameState === GameState.Finish) {
    return <p>result 画面表示</p>;
  } else {
    // tslint:disable-next-line:no-unused-variable
    const check: never = gameState;
    return <p>error {check}</p>;
  }
};
export default Game;

const GameMain = () => {
  useEffect(() => {
    addEventListener("keydown", handleKeydown);

    return () => removeEventListener("keydown", handleKeydown);
  });

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === problem[indexProblem].key[indexChar]) {
      nextChar();
    }
  };

  const [indexProblem, setProblemsIndex] = useState(0);
  const [indexChar, setCharIndex] = useState(0);

  const nextProblem = () => {
    if (problem.length - 1 < indexProblem + 1) {
      setProblemsIndex(0);
    } else {
      setProblemsIndex(indexProblem + 1);
    }
    setCharIndex(0);
  };
  const nextChar = () => {
    const nextCharIndex = indexChar + 1;

    if (problem[indexProblem].key.length - 1 < nextCharIndex) {
      nextProblem();
    } else {
      setCharIndex(nextCharIndex);
    }
  };

  return (
    <div>
      <p> {problem[indexProblem].show} </p>
      <p>
        {" "}
        <span style={{ color: "red" }}>
          {problem[indexProblem].key.substring(0, indexChar)}
        </span>
        {problem[indexProblem].key.substring(
          indexChar,
          problem[indexProblem].key.length
        )}
      </p>
    </div>
  );
};

// あとから別ファイルに書き換える
const problem = [
  { show: "おわり〜", key: "owari~" },
  { show: "hogehoge", key: "hogehoge" },
  { show: "壺おじ", key: "tuboozi" }
];
