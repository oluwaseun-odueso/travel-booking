import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [FlightModule, UsersModule, DatabaseModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
