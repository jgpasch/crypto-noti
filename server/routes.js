import express from 'express';
import Subscription from '../models/subscription';
const router = express.Router();

router.get('/test', (req, res) => {
  res.send({hello: 'world'});
});

router.post('/create', (req, res) => {
  // create subscription with
  // req.body
  console.log(req.body);
  const { token, percent, minVal, maxVal, MinMaxPercentChange } = req.body;
  const sub = new Subscription({
    token,
    percent,
    minVal,
    maxVal,
    MinMaxPercentChange
  });

  sub.save((err) => {
    if (err) {
      throw new Error('problem creating subscription');

    }
  });
  res.send({data: 'success'});

});

router.put('/:id/update', (req, res) => {
  // create subscription with
  // req.body
  res.send({data: `updating object: ${req.params.id}`});
});

router.delete('/:id/delete', (req, res) => {
  // create subscription with
  // req.body
  res.send({data: `deleting object: ${req.params.id}`});
});

export default router;
