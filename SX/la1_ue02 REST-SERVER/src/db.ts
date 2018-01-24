import { Person } from './person';

export class Db {
    private static _instance: Db;

    public static get instance (): Db {
        if (Db._instance === undefined) {
            Db._instance = new Db();
        }
        return Db._instance;
    }
    private _map: { [ htlid: string]: Person } = {};
    private constructor () {
        // Daten werden in die Liste eingetragen
        const liste: Person [] = [];
        liste.push(new Person ({htlid: 'riedom13',  firstname: 'Dominik', surname: 'Riegelnegg'}));
        liste.push(new Person ({htlid: 'moemam13',  firstname: 'Markus', surname: 'Mörth'}));
        liste.push(new Person ({htlid: 'poefam13',  firstname: 'Fabio', surname: 'Pölzl'}));
        liste.push(new Person ({htlid: 'ritmam13',  firstname: 'Mario', surname: 'Ritter'}));
        liste.push(new Person ({htlid: 'woljum13',  firstname: 'Julian', surname: 'Wolf'}));
        liste.push(new Person ({htlid: 'picdom12',  firstname: 'Dominik', surname: 'Pichler'}));
        liste.push(new Person ({htlid: 'ornstm13',  firstname: 'Stefan', surname: 'Ornik'}));
        // Daten werden in eine MAP nach der id eingetragen
        for (const p of liste) {
            this._map[p.htlid] = p;
        }
    }
    public getPerson (id: string): Person {
        return this._map[id];
    }
    public putPerson (p: Person): Person {
        const rv = this._map[p.htlid];
        this._map[p.htlid] = p;
        return rv;
    }
    public deletePerson (id: string): Person {
        const rv = this._map[id];
        if (rv) {
            delete this._map[id];
        }
        return rv;
    }

    public modifyPerson(htlid: string, data: any) {
        const p = this.getPerson(htlid);
        if (!p) {
            throw new Error('invalid htlid');
        }
        p.modify(data);
    }
    public getIds (): string [] {
        return Object.keys(this._map);
    }

    public getSortedList (): Person [] {
        const rv: Person [] = [];

        for (const htlid of this.getIds()) {
            rv.push(this._map[htlid]);
        }
        rv.sort( ( a, b) => {
            if (a.surname === b.surname) {
                return a.firstname > b.firstname ? +1 : -1;
            }
            return a.surname > b.surname ? +1 : -1;
        });
        return rv;
    }
}
