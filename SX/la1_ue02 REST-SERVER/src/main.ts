
import { sprintf } from 'sprintf-js';
import { Server } from './server';
import {DbMongo} from './db-mongo';
import { start } from 'repl';

class Main {

    private _server: Server;

    constructor () {
    }
    public async start () {
        console.log('Start');
        await DbMongo.createInstance();
        this._server = new Server();
        this._server.start(4711);
    }
}

const main = new Main();
async function startup () {
    try {
        main.start();
    } catch (err) {
        console.log(err);
    }
}
startup();
