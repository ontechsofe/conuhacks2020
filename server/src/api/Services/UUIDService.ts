import { Service } from "typedi";
import {Uuid, UuidOptions} from 'node-ts-uuid'


@Service()
export default class UUIDService {

    private readonly options: UuidOptions = {
        length: 20,
    };

    constructor() {
    }

    public new(): string {
        return Uuid.generate(this.options);
    }
}
