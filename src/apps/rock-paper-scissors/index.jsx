import React, { useEffect, useState } from "react";
import "./index.css";
import { Paper, Rock, Scissor } from "./icons";

const choices = [
  { id: 1, name: "paper", component: Paper, lossesTo: 3 },
  { id: 2, name: "rock", component: Rock, lossesTo: 1 },
  { id: 3, name: "scissor", component: Scissor, lossesTo: 2 },
];

export function RockPaperScissors() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [gameState, setGameState] = useState(null);

  useEffect(restartGame, []);

  function handleUserChoice(choice) {
    const chosenChoice = choices.find((ch) => ch.id === choice);
    setUserChoice(chosenChoice);

    if (chosenChoice.lossesTo === computerChoice.id) {
      setGameState("lose");
      setLosses((losses) => losses + 1);
    } else if (computerChoice.lossesTo === chosenChoice.id) {
      setGameState("win");
      setWins((win) => win + 1);
    } else if (computerChoice.id === chosenChoice.id) {
      setGameState("draw");
    }
  }

  function renderComponent(choice) {
    const Component = choice.component;
    return <Component />;
  }

  function restartGame() {
    setUserChoice(null);
    setGameState(null);

    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  }

  return (
    <div className="rock-paper-scissors">
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins === 1 ? "Win" : "Wins"}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses === 1 ? "Loss" : "Losses"}</span>
          </div>
        </div>
      </div>

      {gameState && (
        <div className={`game-state ${gameState}`} onClick={restartGame}>
          <div>
            <div className="game-state-content">
              <p>{renderComponent(userChoice)}</p>
              <p>you {gameState}</p>
              <p>{renderComponent(computerChoice)}</p>
            </div>
            <button>Play Again</button>
          </div>
        </div>
      )}

      <div className="choices">
        <div>You</div>
        <div />
        <div>Computer</div>

        <div>
          <button className="rock" onClick={handleUserChoice.bind(this, 2)}>
            <Rock />
          </button>
          <button className="paper" onClick={handleUserChoice.bind(this, 1)}>
            <Paper />
          </button>
          <button className="scissor" onClick={handleUserChoice.bind(this, 3)}>
            <Scissor />
          </button>
        </div>

        <div className="vs">vs</div>

        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}
