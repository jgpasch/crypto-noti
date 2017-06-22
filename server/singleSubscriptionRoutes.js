import express from 'express';
import Subscription from '../models/subscription';
const router = express.Router();

router.get('/:id', (req, res) => {
  Subscription.findById(req.params.id, (err, data) => {
    res.send(data);
  });
});

router.put('/:id/update', (req, res) => {
  // create subscription with
  // req.body
  Subscription.findByIdAndUpdate(req.params.id, req.body, {}, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
  res.send({data: `updating object: ${req.params.id}`});
});

router.post('/create', (req, res) => {
  console.log(req.body);
  const { token, percent, minVal, maxVal, MinMaxPercentChange } = req.body;
  const sub = new Subscription({
    token,
    percent,
    minVal,
    maxVal,
    MinMaxPercentChange,
    active: false
  });

  sub.save((err, obj) => {
    if (err) {
      throw new Error('problem creating subscription');
    }
    res.send({data: obj});
  });
});

router.delete('/:id/delete', (req, res) => {
  Subscription.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
      res.send(500);
    }
    res.send(data);
  });
});

export default router;
