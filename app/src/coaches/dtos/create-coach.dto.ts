import { Team } from "src/teams/team.entity";

export class CreateCoachDto {
  oldId?: number;
  name?: string;
  dateOfBirth?: string;
  nationality?: string;
  team?: Team;
}