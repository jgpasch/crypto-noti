import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  token: String,
  percent: Number,
  minVal: { type: Number, required: false },
  maxVal: { type: Number, required: false },
  minMaxPercentChange: {type: Number, required: false },
  active: Boolean
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;
