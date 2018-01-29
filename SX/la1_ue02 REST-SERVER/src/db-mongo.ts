import * as mongodb from 'mongodb';

export class DbMongo {
    public static get Instance (): DbMongo {
        if (!DbMongo._instance) {
            throw Error ('instance not created');
        }
        return DbMongo._instance;
    }
    public static async createInstance (name = 'la1'): Promise<DbMongo> {
        if (DbMongo._instance) {
            throw Error ('instance already created');
        }
        const instance = new DbMongo();
        await instance.init();
        DbMongo._instance = instance;
        return DbMongo._instance;
    }
    private static _instance: DbMongo;
    private constructor () {

    }
    private async init () {
        try {
        const uri = 'mongodb://localhost:27017';
        const dbServer = await mongodb.MongoClient.connect(uri);
        console.log('Database connected');
        } catch (err) {
            console.log(err);
            throw Error ('cannot connect mongodb');
        }
    }
}
