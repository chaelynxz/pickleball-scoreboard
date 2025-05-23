export type MatchType = {
  blueScore: number;
  redScore: number;
  isInitialServe: boolean;
  currentServingTeam: "TeamBlue" | "TeamRed";
  courtSide: "left" | "right";
  server: 1 | 2;
};
