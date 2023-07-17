import { Coach } from "src/coaches/coach.entity";
import { CreateCoachDto } from "src/coaches/dtos/create-coach.dto";
import { Area, Competition } from "src/football-data/data.interface";
import { CreatePlayerDto } from "src/players/dtos/create-player.dto";
import { Player } from "src/players/player.entity";
import { CreateTeamDto } from "src/teams/dtos/create-team.dto";
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
  area: mockedArea,
}

export const mockedPlayer: Player = {
  id: 1,
  name: "mockedName",
  position: "mockedPosition",
  dateOfBirth: "mockedBirth",
  nationality: "mockedNationality",
}

export const mockedPlayerCreateDto: CreatePlayerDto = {
  id: 1,
  name: 'mockedName',
  position: 'mockedPosition',
  dateOfBirth: 'mockedBirth2',
  nationality: 'mockedNationality',
};

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

export const mockedTeamCreateDto: CreateTeamDto = {
  id: 1,
  name: "mockedTeam",
  tla: "mockedTla",
  shortName: "mockedShortName",
  areaName: mockedArea.name,
  area: mockedArea,
  address: "mockedAdress",
  squad: [mockedPlayer, mockedPlayer, mockedPlayer],
  coach: mockedCoach
}

export const mockedCoachCreateDto: CreateCoachDto = {
  oldId: 1,
  name: 'mockedName',
  dateOfBirth: 'mockedDate',
  nationality: 'mockedNationality',
};