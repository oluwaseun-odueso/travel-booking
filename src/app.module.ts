import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [FlightModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
