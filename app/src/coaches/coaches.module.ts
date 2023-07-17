import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { Coach } from './coach.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coach])],
  providers: [CoachesService],
  exports: [CoachesService]
})
export class CoachesModule { }
