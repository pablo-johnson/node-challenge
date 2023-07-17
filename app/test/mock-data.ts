import { CreateCoachDto } from "src/coaches/dtos/create-coach.dto";
import { Area, Coach, Competition, CompetitionTeamsResponse, Player } from "src/football-data/data.interface";
import { Team } from "src/teams/team.entity";

export const mockedArea: Area = {
  id: 1,
  name: 'mock-area',
  code: 'mock-code',
};

export const mockedCompetition: Competition = {
  id: 1,
  name: 'mockedName',
  code: 'mockedCode',
  areaName: 'mockedAreaName',
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
  areaName: mockedArea.name,
  address: "mockedAdress",
  players: [mockedPlayer, mockedPlayer, mockedPlayer],
}

export const mockedCoachInputData: CreateCoachDto = {
  oldId: 1,
  name: 'mockedName',
  dateOfBirth: 'mockedDate',
  nationality: 'mockedNationality',
};