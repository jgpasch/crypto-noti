import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Nexmo from 'nexmo';
// local
import keys from '../keys';
import subscriptionRoutes from './routes';
import { initWatch } from './poloSetup';
import { watchData } from './watchObject';

/**
 * Setup express
 *
 */
const app = express();

mongoose.connect('mongodb://localhost/crypto_noti', (err) => {
  if (err) {
    throw new Error('can\'t connect to mongo');
  }
});

app.use(bodyParser.json({ type: '*/*' }));
app.use('/subscriptions', subscriptionRoutes);

// initWatch(watchData);


app.listen(8000, () => {
  console.log('listening on port 8000');
});
