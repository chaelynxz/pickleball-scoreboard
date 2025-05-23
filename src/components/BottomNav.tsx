import { useState } from "react";
import type { MatchType } from "../types/MatchesType";
import { initialMatchData } from "../constant/initialServeData";

type BottomNavProps = {
  matches: MatchType[];
  onSetMatch: (match: MatchType) => void;
  onSetMatches: (matches: MatchType[]) => void;
};

const BottomNav = ({ matches, onSetMatches, onSetMatch }: BottomNavProps) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const showMenu = () => {
    setIsShowMenu(true);
  };
  const hideMenu = () => {
    setIsShowMenu(false);
    setShowHistory(false);
  };

  const handleUndo = () => {
    if (matches.length === 1) {
      return;
    }
    const undoMatches = matches.slice(0, -1);

    const previousMatch = undoMatches[undoMatches.length - 1];

    onSetMatches(undoMatches);
    onSetMatch(previousMatch);
  };

  return (
    <div className="nav">
      <button className="undoButton" onClick={handleUndo}></button>
      <button className="menuButton" onClick={showMenu}></button>

      {isShowMenu && (
        <div className="menu">
          <div className="menuList">
            <button
              className="newGame"
              onClick={() => {
                onSetMatch(initialMatchData);
                onSetMatches([initialMatchData]);
                setIsShowMenu(false);
              }}
            >
              New Game
            </button>

            <button className="scoreHistoryButton">Score History</button>
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
  );
};

export default BottomNav;
