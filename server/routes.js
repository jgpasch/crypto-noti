import express from 'express';
import Subscription from '../models/subscription';
const router = express.Router();

router.get('/test', (req, res) => {
  res.send({hello: 'world'});
});

/**
 * GET all subscriptions
 */
router.get('/', (req, res) => {
  console.log('inside this get');
  Subscription.find({}, (err, data) => {
    res.send(data);
  });
});

router.get('/:coin', (req, res) => {
  Subscription.find({token: req.params.coin}, (err, data) => {
    res.send(data);
  });
});

export default router;
