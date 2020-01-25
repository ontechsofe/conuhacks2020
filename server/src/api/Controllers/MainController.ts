import 'reflect-metadata';
import {JsonController, Post} from 'routing-controllers';

@JsonController('')
export class MainController {
    constructor() {
    }

    @Post('/get')
    public getAllParties(): Array<number> {
        return [];
    }
}
