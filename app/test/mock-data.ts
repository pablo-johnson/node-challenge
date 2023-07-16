import { Area, Coach, Competition, CompetitionTeamsResponse, Player, Team } from "src/football-data/data.interface";

export const mockedArea: Area = {
  id: 1,
  name: 'mock-area',
  code: 'mock-code',
};

export const mockedCompetition: Competition = {
  id: 1,
  name: 'mockedName',
  code: 'mockedCode',
  area: mockedArea,
}

export const mockedPlayer: Player = {
  id: 1,
  name: "mockedName",
  position: "mockedPosition",
  dateOfBirth: "mockedBirth",
  nationality: "mockedNationality",
}

export const mockedCoach: Coach = {
  id: 1,
  name: "mockedName",
  dateOfBirth: "mockedBirth",
  nationality: "mockedNationality",
}

export const mockedTeam: Team = {
  id: 1,
  name: "mockedTeam",
  tla: "mockedTla",
  shortName: "mockedShortName",
  area: mockedArea,
  address: "mockedAdress",
  squad: [mockedPlayer, mockedPlayer, mockedPlayer],
  coach: mockedCoach,
}

export const mockedCompetitionTeams: CompetitionTeamsResponse = {
  competition: mockedCompetition,
  teams: [mockedTeam],
}