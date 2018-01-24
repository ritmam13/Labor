export interface IPerson {
    htlid: string;
    firstname: string;
    surname: string;
}

export class Person implements IPerson {
    private _htlid: string;
    private _firstname: string;
    private _surname: string;

    // constructor(htlid: string, firstname: string, surname: string) {
    constructor(p: IPerson) {
        if (!p.htlid || typeof p.htlid !== 'string') {
            throw new Error('missing/invalid htlid');
        }
        this._htlid = p.htlid;
        if (!p.firstname || typeof p.firstname !== 'string') {
            throw new Error('missing/invalid firstname');
        }
        this._firstname = p.firstname;
        if (!p.surname || typeof p.surname !== 'string') {
            throw new Error('missing/invalid surname');
        }
        this._surname = p.surname;
        if (Object.keys(this).length !== Object.keys(p).length) {
            throw new Error('Invalide count of types');
        }
    }

    public toObject (): IPerson {
       return {
           htlid: this._htlid,
           firstname: this._firstname,
           surname: this._surname
       };
    }

    public get htlid(): string {
        return this._htlid;
    }

    public set htlid(value: string) {
        this._htlid = value;
    }

    public get firstname(): string {
        return this._firstname;
    }

    public set firstname(value: string) {
        this._firstname = value;
    }

    public get surname(): string {
        return this._surname;
    }

    public set surname(value: string) {
        this._surname = value;
    }
    public modify (data: any) {
        if (typeof data !== 'object') {
            throw new Error('data is not an object');
        }
        let attCnt = 0;
        if (data.htlid) {
            if (data.htlid !== this._htlid) {
                throw new Error('invalid htlid');
            }
            attCnt++;
        }
        if (data.surname && typeof data.surname === 'string') {
            attCnt++;
        }
        if (data.firstname && typeof data.firstname === 'string') {
            attCnt++;
        }
        if (Object.keys(data).length !== attCnt) {
            throw new Error ('invalid attributes');
        }

        if (data.surname) {
            this._surname = data.surname;
        }
        if (data.firstname) {
            this._firstname = data.firstname;
        }
    }
}
