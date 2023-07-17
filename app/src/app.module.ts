import { Module } from '@nestjs/common';
import { FootballDataModule } from './football-data/football-data.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionsModule } from './competitions/competitions.module';
import { Competition } from './competitions/competition.entity';
import { CoachesModule } from './coaches/coaches.module';
import { Coach } from './coaches/coach.entity';
import { TeamsModule } from './teams/teams.module';
import { Team } from './teams/team.entity';
import { PlayersModule } from './players/players.module';
import { Player } from './players/player.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
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
        entities: [Competition, Team, Player, Coach],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 15,
    }),
    CoachesModule,
    TeamsModule,
    PlayersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
})
export class AppModule { }
