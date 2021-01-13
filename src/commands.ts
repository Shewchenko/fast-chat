import { NestFactory } from '@nestjs/core';
import { CommandsService } from "./commands/commands.service";
import { CommandsModule } from "./commands/commands.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
    const logger = new Logger("bootstrap")
    const app = await NestFactory.create(CommandsModule);

    //run $ CMD=cmdTest npm run cli:cmd

    const optionDefinitions = [
        { name: 'command', alias: 'c', type: String },
        // { name: 'verbose', alias: 'v', type: Boolean },
        // { name: 'src', type: String, multiple: true, defaultOption: true },
        // { name: 'timeout', alias: 't', type: Number }
      ]
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const commandLineArgs = require('command-line-args')
    const options = commandLineArgs(optionDefinitions)
    logger.log(options)

    const service = app.get(CommandsService)
    await service[options.command]()
    logger.log('work')
    await app.close()
}
bootstrap();
