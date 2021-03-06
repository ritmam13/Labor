
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Db } from './db';
import { IPerson } from './person';
import { Person } from './person';
import { DbMongo } from './db-mongo';
export class Server {

    private _server: express.Express;
    constructor() {

    }

    public start (port: number) {
        this._server = express();
        // konfigurieren des Servers

        this._server.use(bodyParser.json()); // JSON Daten werden in Objekte umgewandelt
        this._server.use(bodyParser.urlencoded({ extended: true})); // Informationen die urlencoded sind werden in ihr ursprungszeichen
                                                                    // umgewandelt
        this._server.get('/person', (req, res, next) => this.httpGetPerson(req, res, next));
        this._server.put('/person', (req, res, next) => this.httpPutPerson(req, res, next));
        this._server.post('/person', (req, res, next) => this.httpPostPerson(req, res, next));
        this._server.delete('/person', (req, res, next) => this.httpDeletePerson(req, res, next));
        this._server.all('*', (req, res, next) => this.httpAllHandler(req, res, next));






        this._server.listen(port);
        console.log('Server auf Port ' + port + ' gestartet');
    }
    private httpAllHandler(req: express.Request, res: express.Response, next: express.NextFunction): any {
        res.status(404).send('Not found');
        // next();
    }
    private async httpGetPerson(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {

            if ( !req.query || !req.query.id) {
                res.status(400).send('Bad request');
                return;
            }

            const ids = Array.isArray(req.query.id) ? req.query.id : [req.query.id];

            const rv: IPerson [] = [];

            for (const id of ids) {
                const p = await DbMongo.Instance.getPerson(id);
                if (p !== undefined) {
                    rv.push(p.toObject());
                } else {
                    res.status(404).send('Not found');
                    return;
                }
            }
            if (rv.length === 1) {
                res.json(rv[0]);
            } else {
                res.json(rv);
            }
        } catch (err) {
            res.status(400).send(err.message).end();
        }
    }

    private async httpPostPerson(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            const p: IPerson = req.body;
            const person = new Person (p);
            const id = DbMongo.Instance.addPerson(person);
            res.end();
        }catch (err) {
            res.status(400).send(err.message).end();
        }
    }

    private async httpPutPerson(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            const id = req.query.id;
            const p = Db.instance.getPerson(id);
            if (!p) {
                throw new Error('invalid id ' + id);
            }
            const pBody: any = req.body;
            await DbMongo.Instance.modifyPerson(new Person(pBody));
            res.end();
        }catch (err) {
            res.status(400).send(err.message).end();
        }
    }
    private async httpDeletePerson(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            const id  = req.query.id;
            const p = await DbMongo.Instance.deletePerson(id);
            if (!p) {
                throw new Error('invalid id ' + id);
            }
            res.end();
        }catch (err) {
            res.status(400).send(err.message).end();
        }
    }
}
