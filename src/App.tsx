import { useEffect, useState } from "react";

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

  const [matches, setMatches] = useState<MatchType[]>([]);

  useEffect(() => {
    setMatches([...matches, initialMatchData]);
  }, []);

  return (
    <div className="body">
      <div className="bigCon">
        <ScoreBoard
          match={match}
          onSetMatch={setMatch}
          matches={matches}
          onSetMatches={setMatches}
        />
        <BottomNav
          match={match}
          onSetMatch={setMatch}
          matches={matches}
          onSetMatches={setMatches}
        />
      </div>
    </div>
  );
}

export default App;
