import { useEffect, useState } from "react";
import type { MatchType } from "../types/MatchesType";
import Modal from "react-modal";
import { initialMatchData } from "../constant/initialServeData";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type ScoreBoardProps = {
  onSetMatches: (matches: MatchType[]) => void;
  matches: MatchType[];
  match: MatchType;
  onSetMatch: (match: MatchType) => void;
};

const ScoreBoard = ({
  onSetMatches,
  matches,
  match,
  onSetMatch,
}: ScoreBoardProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [winner, setWinner] = useState<null | "TeamBlue" | "TeamRed">(null);

  const {
    blueScore,
    redScore,
    currentServingTeam,
    courtSide,
    isInitialServe,
    server,
  } = match;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    onSetMatch(initialMatchData);
    onSetMatches([initialMatchData]);
  }

  useEffect(() => {
    const winBlue = blueScore - redScore;
    const winRed = redScore - blueScore;
    if (blueScore >= 11 && winBlue >= 2) {
      console.log("Blue Wins");
      openModal();
      setWinner("TeamBlue");

      return;
    }
    if (redScore >= 11 && winRed >= 2) {
      console.log("Red Wins");
      setWinner("TeamRed");
      openModal();
      return;
    }
  }, [redScore, blueScore]);

  const addScore = () => {
    let newMatch;
    if (currentServingTeam === "TeamBlue") {
      newMatch = {
        ...match,
        blueScore: blueScore + 1,
        courtSide: courtSide === "right" ? "left" : "right",
      };
    } else {
      newMatch = {
        ...match,
        redScore: redScore + 1,
        courtSide: courtSide === "right" ? "left" : "right",
      };
    }

    onSetMatch(newMatch as MatchType);
    onSetMatches([...matches, newMatch as MatchType]);
  };

  const onFault = () => {
    let newMatch;

    if (isInitialServe) {
      newMatch = {
        ...match,
        server: 1,
        currentServingTeam: "TeamRed",
        isInitialServe: false,
        courtSide: "right",
      };
      onSetMatch(newMatch as MatchType);
      onSetMatches([...matches, newMatch as MatchType]);
      console.log("init");
      return;
    }

    if (server === 1) {
      newMatch = {
        ...match,
        server: 2,
        courtSide: courtSide === "right" ? "left" : "right",
      };
      onSetMatch(newMatch as MatchType);
      onSetMatches([...matches, newMatch as MatchType]);
      console.log("server 1");
      return;
    }

    if (server === 2) {
      newMatch = {
        ...match,
        currentServingTeam:
          currentServingTeam === "TeamBlue" ? "TeamRed" : "TeamBlue",
        server: 1,
        courtSide: "right",
      };
      onSetMatch(newMatch as MatchType);
      onSetMatches([...matches, newMatch as MatchType]);
      console.log("server 2");
      return;
    }
  };

  return (
    <div className="scoreboard">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 style={{ color: winner === "TeamBlue" ? "#543ecd" : "#ce3e3e" }}>
          {winner === "TeamBlue" ? "Blue Wins" : "Red Wins"}
        </h1>
      </Modal>
      <div className="teamRed">
        <div
          className={`boxes ${
            currentServingTeam === "TeamRed" && courtSide === "left"
              ? "greenBorder"
              : ""
          }`}
          id="red2"
        >
          RL
        </div>
        <div
          className={`boxes ${
            currentServingTeam === "TeamRed" && courtSide === "right"
              ? "greenBorder"
              : ""
          }`}
          id="red1"
        >
          RR
        </div>
      </div>
      <div
        className="midCon"
        style={{
          transform:
            currentServingTeam === "TeamRed"
              ? "rotate(180deg)"
              : "rotate(0deg)",
        }}
      >
        <button className="fault" onClick={onFault}>
          Fault
        </button>
        <p>
          {currentServingTeam === "TeamBlue" ? blueScore : redScore}-
          {currentServingTeam === "TeamRed" ? blueScore : redScore}-{server}
        </p>
        <button className="score" onClick={addScore}>
          +1
        </button>
      </div>
      <div className="teamBlue">
        <div
          className={`boxes ${
            currentServingTeam === "TeamBlue" && courtSide === "left"
              ? "greenBorder"
              : ""
          }`}
          id="blue2"
        >
          BL
        </div>
        <div
          className={`boxes ${
            currentServingTeam === "TeamBlue" && courtSide === "right"
              ? "greenBorder"
              : ""
          }`}
          id="blue1"
        >
          BR
        </div>
      </div>
    </div>
  );
};
export default ScoreBoard;
