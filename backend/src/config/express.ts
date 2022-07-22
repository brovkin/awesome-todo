import cors from 'cors';
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import routes from '../routes';

const createServer = (): express.Application => {
  const app = express();

  app.set('view engine', 'hbs');

  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
    })
  );

  app.set('views', path.join(__dirname, '../views'));

  app.use('/public', express.static('public'));

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());

  app.use('/api/v1', routes);

  return app;
};

export { createServer };
