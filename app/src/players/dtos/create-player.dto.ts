import { Team } from "src/teams/team.entity";

export class CreatePlayerDto {
  id?: number;
  name?: string;
  dateOfBirth?: string;
  position?: string;
  nationality?: string;
  team?: Team;
}