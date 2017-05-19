import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Nexmo from 'nexmo';
// local
import keys from '../keys';
import initRoutes from './routes';
import { initWatch } from './poloSetup';
import { watchData } from './watchObject';

/**
 * Setup express
 *
 */
const app = express();

app.use(bodyParser.json({ type: '*/*' }));
initRoutes(app);

initWatch(watchData);


app.listen(8000, () => {
  console.log('listening on port 8000');
});
