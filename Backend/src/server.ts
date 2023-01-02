import http from 'http';

import cors from 'cors';

import express, { Express } from 'express';

import helmet from 'helmet';

import { config } from './config';
 
import { router } from './routes';

export default class Server {
  app: Express;
  httpServer: http.Server;

  constructor() {
    this.app = express();

    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(router);
    
    this.app.set('views', __dirname + '/views');
    this.app.set('view engine', 'pug');
  
    this.app.get('/', (req, res) => {
      res.send('Welcome to the Project');
    });

    this.httpServer = http.createServer(this.app);
  }

  start(cb?: () => void) {
    this.httpServer.listen(config.PORT, () => {
      console.log(`Server started at ${config.HOST}:${config.PORT}`);
      if (typeof cb === 'function') {
        cb();
      }
    });
  }
  stop() {
    this.httpServer.close();
  }
}