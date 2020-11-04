import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
// import {TypeOrmModule} from "@nestjs/typeorm";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [
      ConfigModule.forRoot({envFilePath:'.env', isGlobal: true}),
      // TypeOrmModule.forRoot(),
      CommandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
