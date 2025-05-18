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

  const handleNewGame = () => {
    setMatch(initialMatchData);
    setIsShowMenu(false);
  };

  const showMenu = () => {
    setIsShowMenu(true);
  };
  const hideMenu = () => {
    setMatch(initialMatchData);
    setIsShowMenu(false);
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

  // useEffect(() => {
  //   //first load
  // }, []);

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

    // if (blueScore === 11) {
    //   console.log("Blue Wins");
    //   return;
    // }
    // if (redScore === 11) {
    //   console.log("Red Wins");
    //   return;
    // }
  }, [redScore, blueScore]);

  const addScore = () => {
    if (currentServingTeam === "TeamBlue") {
      setMatch({
        ...match,
        blueScore: blueScore + 1,
        courtSide: courtSide === "right" ? "left" : "right",
      });
    } else {
      setMatch({
        ...match,
        redScore: redScore + 1,
        courtSide: courtSide === "right" ? "left" : "right",
      });
    }
  };

  const onFault = () => {
    if (isInitialServe) {
      setMatch({
        ...match,
        server: 1,
        currentServingTeam: "TeamRed",
        isInitialServe: false,
      });
      return;
    }

    if (server === 1) {
      setMatch({
        ...match,
        server: 2,
        courtSide: courtSide === "right" ? "left" : "right",
      });

      return;
    }

    if (server === 2) {
      setMatch({
        ...match,
        currentServingTeam:
          currentServingTeam === "TeamBlue" ? "TeamRed" : "TeamBlue",
        server: 1,
        courtSide: "right",
      });

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
  }

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
          {winner === "TeamBlue" ? "Blue Wins" : "Red Teams"}
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
              {currentServingTeam === "TeamBlue" ? blueScore :redScore}-{currentServingTeam === "TeamRed" ? blueScore : redScore}-{server}
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
          <button className="undoButton"></button>
          <button className="menuButton" onClick={showMenu}></button>
        </div>

        {isShowMenu && (
          <div className="menu">
            <div className="menuList">
              <button className="newGame" onClick={handleNewGame}>
                New Game
              </button>
            </div>
            <div>
              <button className="closeMenu" onClick={hideMenu}></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
