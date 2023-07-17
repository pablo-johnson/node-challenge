import { Area, Coach } from "src/football-data/data.interface";
import { Player } from "src/players/player.entity";

export class CreateTeamDto {
  id: number;
  name?: string;
  tla?: string;
  shortName?: string;
  areaName?: string;
  address?: string;
  coach?: Coach;
  area?: Area;
  squad?: Player[];
}