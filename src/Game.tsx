import * as React from "react";
import { useEffect, useState } from "react";
import problem from "./problems";

enum GameState {
  Ready,
  InAction,
  Finish
}

const audioCorrect = new Audio("audio/correct.mp3");
const audioIncorrect = new Audio("audio/incorrect.mp3");
const autioThanks = new Audio("audio/thanks-owari.mp3");

const Game = () => {
  const [time, setTime] = useState(60);
  const [gameState, setGameState] = useState<GameState>(GameState.Ready);

  useEffect(() => {
    addEventListener("keydown", handleKeydown);
    const id = setInterval(decrementCount, 1000);

    return () => {
      removeEventListener("keydown", handleKeydown);
      clearInterval(id);
    };
  });

  const decrementCount = () => {
    if (gameState !== GameState.InAction) {
      return;
    }

    if (time === 0) {
      setGameState(GameState.Finish);
      setTime(60);
      autioThanks.play();
      return;
    }

    setTime(time - 1);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    switch (gameState) {
      case GameState.Ready:
        if (event.key === " ") {
          setGameState(GameState.InAction);
        }
        break;
      default:
        if (event.key === "Escape") {
          setGameState(GameState.Ready);
          setTime(60);
        }
        break;
    }
  };

  return (
    <div className="game-content tile is-parent">
      <article className="tile is-child notification is-danger">
        <div className="main-flex-container">
          <p>制限時間 : {time}s</p>
          <p>スコア: {"後日追加..."}</p>
        </div>

        <div className="game-inner">
          <GameInner gameState={gameState} />
        </div>

        <p className="text-center">やり直す(Escキー)</p>
      </article>
    </div>
  );
};

interface IProps {
  gameState: GameState;
}

const GameInner = ({ gameState }: IProps) => {
  switch (gameState) {
    case GameState.Ready:
      return <p className="text-center">スペースキーを押してゲームスタート</p>;
    case GameState.InAction:
      return <GameMain />;
    case GameState.Finish:
      return <p className="text-center">おわり〜！！</p>;
  }
};
export default Game;

const GameMain = () => {
  const [indexProblem, setProblemsIndex] = useState(0);
  const [indexChar, setCharIndex] = useState(0);
  const [voiceAudio, setVoiceAudio] = useState(
    new Audio(problem[indexProblem].sound)
  );

  useEffect(() => {
    addEventListener("keydown", handleKeydown);

    return () => removeEventListener("keydown", handleKeydown);
  });

  const handleKeydown = (event: KeyboardEvent) => {
    if (ignoreKeys.includes(event.key)) {
      return;
    }

    if (event.key === problem[indexProblem].key[indexChar]) {
      audioCorrect.volume = 0.2;
      audioCorrect.currentTime = 0;
      audioCorrect.play();
      nextChar();
    } else {
      audioIncorrect.volume = 0.2;
      audioIncorrect.currentTime = 0;
      audioIncorrect.play();
    }
  };

  const nextProblem = () => {
    voiceAudio.play();

    if (problem.length - 1 < indexProblem + 1) {
      setProblemsIndex(0);
      setVoiceAudio(new Audio(problem[0].sound));
    } else {
      voiceAudio.play();
      const nextIndex = indexProblem + 1;

      setProblemsIndex(nextIndex);
      setVoiceAudio(new Audio(problem[nextIndex].sound));
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
    <div className="text-center tile is-child box">
      <p> {problem[indexProblem].show} </p>
      <p style={{ wordWrap: "break-word" }}>
        <span style={{ color: "hsl(204, 86%, 53%)" }}>
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

const ignoreKeys = ["Shift", "Escape", " ", "Enter"];
