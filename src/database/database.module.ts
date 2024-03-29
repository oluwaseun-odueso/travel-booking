// import { Module } from '@nestjs/common';
// import { DatabaseService } from './database.service';
// import { DatabaseController } from './database.controller';

// @Module({
//   controllers: [DatabaseController],
//   providers: [DatabaseService],
// })
// export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}