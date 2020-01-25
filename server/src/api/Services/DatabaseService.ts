import {Service} from "typedi";
import DB, {Database} from 'better-sqlite3';
import logger from "../../util/Log";

@Service()
export default class DatabaseService {
    private readonly DB_FILE = "database.db";
    private readonly db: Database;

    constructor() {
        this.db = new DB(this.DB_FILE, {
            verbose: (message) => {
                logger.debug(`[DATABASE] ${message}`)
            }
        });
    }

    public getDatabase(): Database {
        return this.db;
    }
}
