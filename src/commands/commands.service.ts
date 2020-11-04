import { Injectable } from '@nestjs/common';

@Injectable()
export class CommandsService {

    async cmdTest() {
        console.log("Success")
    }
}
