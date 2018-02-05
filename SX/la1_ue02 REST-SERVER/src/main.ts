
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

    public async run () {
    }
}

const main = new Main();
async function startup () {
    try {
        await main.start();
        await main.run();
    } catch (err) {
        console.log(err);
    }
}
startup();
