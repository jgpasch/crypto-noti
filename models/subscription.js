import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  token: String,
  percent: Number,
  minVal: Number,
  maxVal: Number,
  minMaxPercentChange: Number
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;
