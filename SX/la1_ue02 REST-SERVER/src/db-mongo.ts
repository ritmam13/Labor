import * as mongodb from 'mongodb';
import { IPerson, Person } from './person';

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
    private _collPersonen: mongodb.Collection;
    private constructor () {

    }

    public async getPerson (htlid: string): Promise<Person> {
        const personen = await this._collPersonen.find({htlid: htlid}).toArray();
        if (personen.length === 0) {
            return undefined;
        }
        if (personen.length > 1) {
            throw new Error ('Database inconsistend: multible data found');
        }
        delete personen[0]._id;
        return new Person(personen[0]);
    }
    /**
     * Removing a document
     * @param  {string} htlid - The htlid of the person
     * @returns {boolean} - true if document found and removed
     */
    public async deletePerson (htlid: string): Promise<boolean> {
        const result = await this._collPersonen.deleteMany({htlid: htlid});
        if (result.deletedCount > 1) {
            throw new Error('databas inconsistend: deleted' + result.deletedCount + 'data');
        }
        return result.deletedCount === 1;
    }
    public async addPerson (person: Person): Promise<string> {
        const p = person.toObject();
        const result = await this._collPersonen.insertOne(p);
        if (result.insertedCount !== 1) {
            throw new Error('Cannot add Data' + p.htlid);
        }
        return result.insertedId.toHexString();
    }
    public async modifyPerson (htlid: string, person: any): Promise<boolean> {
        const p = this.getPerson(htlid);
        const upd: any = { $set : {}};
        for (const att in person) {
            if (!person.hasOwnProberty(att)) {continue; }
            if (person[att] !== (<any>p) [att]) {
                upd['$set'][att] = person[att];
            }
        }
        const result = await this._collPersonen.updateMany({htlid: htlid}, upd);
        if (result.modifiedCount !== 1) {
            throw new Error('Cannot modify Data' + htlid);
        }
        return result.modifiedCount === 1;
    }

    private async init () {
        try {
        const uri = 'mongodb://localhost:27017';
        const dbServer = await mongodb.MongoClient.connect(uri);
        console.log('Database connected');
// Verbindung zu Datenbank aufbauen
        const dbPersonen = dbServer.db('la1-g2');
        this._collPersonen = await dbPersonen.collection('personen');
        const size = await this._collPersonen.count({});
        if (size === 0) {
            const personen: IPerson [] = [
                {
                    htlid: 'woljum13',
                    surname: 'Wolf',
                    firstname: 'Julian'
                },
                {
                    htlid: 'moemam13',
                    surname: 'Mörth',
                    firstname: 'Markus'
                }
            ];
            await this._collPersonen.insertMany(personen);
        }
        console.log(size);
        } catch (err) {
            console.log(err);
            throw Error ('cannot connect mongodb');
        }
    }

}
