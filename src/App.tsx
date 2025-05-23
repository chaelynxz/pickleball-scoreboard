import { useEffect, useState } from "react";
import Modal from "react-modal";

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

import "./App.css";
import type { MatchType } from "./types/MatchesType";
import BottomNav from "./components/BottomNav";
import ScoreBoard from "./components/ScoreBoard";

const initialMatchData: MatchType = {
  blueScore: 0,
  redScore: 0,
  isInitialServe: true,
  currentServingTeam: "TeamBlue",
  courtSide: "right",
  server: 2,
};

// Modal.setAppElement("body");

function App() {
  const [match, setMatch] = useState<MatchType>(initialMatchData);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [winner, setWinner] = useState<null | "TeamBlue" | "TeamRed">(null);
  const [matches, setMatches] = useState<MatchType[]>([]);

  const handleNewGame = () => {
    setMatch(initialMatchData);
    setMatches([initialMatchData]);
  };

  const {
    blueScore,
    redScore,
    currentServingTeam,
    courtSide,
    isInitialServe,
    server,
  } = match;

  useEffect(() => {
    setMatches([...matches, initialMatchData]);
  }, []);

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

  useEffect(() => {
    console.log({ matches });
  }, [matches]);

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

    setMatch(newMatch as MatchType);
    setMatches([...matches, newMatch as MatchType]);
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
      setMatch(newMatch as MatchType);
      setMatches([...matches, newMatch as MatchType]);
      console.log("init");
      return;
    }

    if (server === 1) {
      newMatch = {
        ...match,
        server: 2,
        courtSide: courtSide === "right" ? "left" : "right",
      };
      setMatch(newMatch as MatchType);
      setMatches([...matches, newMatch as MatchType]);
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
      setMatch(newMatch as MatchType);
      setMatches([...matches, newMatch as MatchType]);
      console.log("server 2");
      return;
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle?.style?.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    setMatch(initialMatchData);
    setMatches([initialMatchData]);
  }

  const handleUndo = () => {
    if (matches.length === 1) {
      return;
    }
    const undoMatches = matches.slice(0, -1);

    const previousMatch = undoMatches[undoMatches.length - 1];

    setMatches(undoMatches);
    setMatch(previousMatch);
  };

  return (
    <div className="body">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 style={{ color: winner === "TeamBlue" ? "#543ecd" : "#ce3e3e" }}>
          {winner === "TeamBlue" ? "Blue Wins" : "Red Wins"}
        </h1>
      </Modal>
      <div className="bigCon">
        <ScoreBoard match ={match} onFault={onFault} addScore={addScore}/>
        <BottomNav
          matches={matches}
          handleNewGame={handleNewGame}
          handleUndo={handleUndo}
        />
      </div>
    </div>
  );
}

export default App;
