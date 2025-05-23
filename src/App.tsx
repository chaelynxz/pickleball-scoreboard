import { useEffect, useState } from "react";

import "./App.css";
import type { MatchType } from "./types/MatchesType";
import BottomNav from "./components/BottomNav";
import ScoreBoard from "./components/ScoreBoard";
import { initialMatchData } from "./constant/initialServeData";

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
          onSetMatch={setMatch}
          matches={matches}
          onSetMatches={setMatches}
        />
      </div>
    </div>
  );
}

export default App;
