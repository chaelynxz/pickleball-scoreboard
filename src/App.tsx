import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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

function App() {
  const [match, setMatch] = useState<MatchType>(initialMatchData);

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
      return;
    }
    if (redScore >= 11 && winRed >= 2) {
      console.log("Red Wins");
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

  return (
    <div className="body">
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
          <div className="midCon">
            <button className="fault" onClick={onFault}>
              Fault
            </button>
            <p>
              {blueScore}-{redScore}-{server}
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
          <button className="undo"></button>
          <button className="menu"></button>
        </div>
      </div>
    </div>
  );
}

export default App;
