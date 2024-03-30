import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { DatabaseModule } from 'src/database/database.module';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    GoogleStrategy,
    ...usersProviders,
  ],
})
export class UsersModule {}
