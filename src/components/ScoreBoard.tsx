import type { MatchType } from "../types/MatchesType";

type ScoreBoardProps = {

  match: MatchType;
  onFault: ()=> void
  addScore: ()=> void
};

const ScoreBoard = ({ match, onFault, addScore }: ScoreBoardProps) => {
  const {
    blueScore,
    redScore,
    currentServingTeam,
    courtSide,
    server,
  } = match;
  return (
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
  );
};
export default ScoreBoard;
