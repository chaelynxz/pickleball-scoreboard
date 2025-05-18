import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="body">
      <div className="bigCon">
        <div className="scoreboard">
          <div className="teamRed">
            <div className="boxes" id="red2">
              R2
            </div>
            <div className="boxes" id="red1">
              R1
            </div>
          </div>
          <div className="midCon">
            <button className="fault">Fault</button>
            <p>2-0-1</p>
            <button className="score">+1</button>
          </div>
          <div className="teamBlue">
            <div className="boxes" id="blue2">
              B2
            </div>
            <div className="boxes greenBorder" id="blue1">
              B1
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
