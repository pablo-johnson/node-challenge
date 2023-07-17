import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FootballDataModule } from './football-data/football-data.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from './competitions/competition.entity';
import { CoachesModule } from './coaches/coaches.module';
import { Coach } from './coaches/coach.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    FootballDataModule,
    CompetitionsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_SERVER'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Competition, Coach],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CoachesModule,],
})
export class AppModule { }
