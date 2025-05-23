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

type MatchType = {
  blueScore: number;
  redScore: number;
  isInitialServe: boolean;
  currentServingTeam: "TeamBlue" | "TeamRed";
  courtSide: "left" | "right";
  server: 1 | 2;
};

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
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [winner, setWinner] = useState<null | "TeamBlue" | "TeamRed">(null);
  const [matches, setMatches] = useState<MatchType[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleScoreHistory = () => {
    setShowHistory(true);
  };

  const handleNewGame = () => {
    setMatch(initialMatchData);
    setIsShowMenu(false);
    setMatches([initialMatchData]);
  };

  const showMenu = () => {
    setIsShowMenu(true);
  };
  const hideMenu = () => {
    setIsShowMenu(false);
    setShowHistory(false);
  };

  const {
    blueScore,
    redScore,
    currentServingTeam,
    courtSide,
    isInitialServe,
    server,
  } = match;
  // const [blueScore, setBlueScore] = useState(0);
  // const [redScore, setRedScore] = useState(0);
  // const [isInitialServe, setInitialServe] = useState(true);
  // const [currentServingTeam, setCurrentServingTeam] = useState<
  //   "TeamBlue" | "TeamRed"
  // >("TeamBlue");
  // const [courtSide, setCourtSide] = useState<"left" | "right">("right");
  // const [server, setServer] = useState<1 | 2>(2);

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
        <div className="scoreboard">
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
        <div className="nav">
          <button className="undoButton" onClick={handleUndo}></button>
          <button className="menuButton" onClick={showMenu}></button>
        </div>

        {isShowMenu && (
          <div className="menu">
            <div className="menuList">
              <button className="newGame" onClick={handleNewGame}>
                New Game
              </button>

              <button
                className="scoreHistoryButton"
                onClick={handleScoreHistory}
              >
                Score History
              </button>
            </div>
            <div>
              <button className="closeMenu" onClick={hideMenu}></button>
            </div>
          </div>
        )}

        {showHistory && (
          <div
            className="scoreHistory"
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <button
              className="closeMenu"
              onClick={hideMenu}
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: "#999",
              }}
            >
              ✖
            </button>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "10px",
                color: "#333",
              }}
            >
              Match History
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[...matches].reverse().map((match, index) => {
                const prevMatch = matches[matches.length - (index + 2)];
                let scoringAnnouncement = "";
                console.log({ index });
                if (prevMatch) {
                  if (match.blueScore > prevMatch.blueScore) {
                    scoringAnnouncement = `${matches.length - index}.🔵 Blue ${
                      match.server
                    } secured the point!`;
                  } else if (match.redScore > prevMatch.redScore) {
                    scoringAnnouncement = `${matches.length - index}.🔴 Red ${
                      match.server
                    } secured the point!`;
                  }
                }

                return scoringAnnouncement ? (
                  <li
                    key={index}
                    style={{
                      background:
                        match.currentServingTeam === "TeamBlue"
                          ? "#e1f5fe"
                          : "#ffebee",
                      padding: "10px",
                      marginBottom: "5px",
                      borderRadius: "6px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {scoringAnnouncement}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
