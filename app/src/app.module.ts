import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FootballDataModule } from './football-data/football-data.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [FootballDataModule],
})
export class AppModule {}
