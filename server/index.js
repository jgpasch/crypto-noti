import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Nexmo from 'nexmo';
import cors from 'cors';
// local
import keys from '../keys';
import subscriptionRoutes from './routes';
import singleSubscriptionRoutes from './singleSubscriptionRoutes';
import authRoutes from './authRoutes';
import { initWatch } from './poloSetup';
import { watchData } from './watchObject';
import passport from 'passport';
import passportService from './services/passport';
const requireAuth = passport.authenticate('jwt', { session: false });

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

app.use(cors());

app.use(bodyParser.json({ type: '*/*' }));
app.use('/subscriptions', requireAuth, subscriptionRoutes);
app.use('/subscription', requireAuth, singleSubscriptionRoutes);
app.use('/auth', authRoutes);

// initWatch(watchData);


app.listen(8000, () => {
  console.log('listening on port 8000');
});
