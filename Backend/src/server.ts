import http from 'http';

import cors from 'cors';

import express, { Express, Request, Response } from 'express';

import bodyParser from 'body-parser';

import helmet from 'helmet';

import multer, { FileFilterCallback } from 'multer';

import { config } from './config';

import { router } from './routes';

import { v4 } from 'uuid';

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    console.log(_file?.fieldname);
    if (_file?.fieldname == "image") {
      cb(null, "apiuploads/images");
    } else {
      cb(null, "apiuploads/images");
    }
  },
  filename: (_req, file, cb) => {
    cb(null, `${v4()}_${file.originalname}`);
  }
});

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
export default class Server {
  app: Express;
  httpServer: http.Server;

  constructor() {
    this.app = express();

    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(multer({ storage: fileStorage, fileFilter }).fields([{ name: 'image', maxCount: 1 }]));
    this.app.use("/apiuploads", express.static("apiuploads"));
    this.app.use(router);

    this.app.set('views', __dirname + '/views');
    this.app.set('view engine', 'pug');

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
