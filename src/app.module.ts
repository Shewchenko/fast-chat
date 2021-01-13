import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
// import {TypeOrmModule} from "@nestjs/typeorm";
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandsModule } from './commands/commands.module';
import { ChatsModule } from './chats/chats.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
      ConfigModule.forRoot({envFilePath:'.env', isGlobal: true}),
      // TypeOrmModule.forRoot(),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'client'),
      }),
      CommandsModule,
      ChatsModule,
      RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
