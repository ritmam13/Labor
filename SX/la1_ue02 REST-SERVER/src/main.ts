
import { sprintf } from 'sprintf-js';
import { Server } from './server';


class Main {

    private _server: Server;

    constructor () {
        console.log('Start');
        this._server = new Server();
        this._server.start(4711);
    }
}

const main = new Main();
