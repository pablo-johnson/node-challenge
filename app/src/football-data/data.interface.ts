export interface Area {
  id: number,
  name: string,
  code: string,
}

export interface Competition {
  id: number,
  name: string,
  code: string,
  area: Area,
}

export interface Player {
  id: number,
  name: string,
  position: string,
  dateOfBirth: string,
  nationality: string,
}

export interface Coach {
  id: number,
  name: string,
  dateOfBirth: string,
  nationality: string,
}

export interface Team {
  id: number,
  name: string,
  tla: string,
  shortname: string,
  area: Area,
  address: string,
  squad: Player[],
  coach: Coach,
}

export interface CompetitionTeamsResponse {
  competition: Competition,
  teams: Team[],
}