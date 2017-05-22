import _ from 'lodash';
import Nexmo from 'nexmo';
import { tokens, watchData } from './watchObject';
import keys from '../keys';

// setup nexmo
const nexmo = new Nexmo({
  apiKey: keys.apiKey,
  apiSecret: keys.apiSecret
});

export function tickerEvent(args, kwargs) {
  const coin = args[0];
  const last = args[1];

  if (_.includes(tokens, coin)) {
    if (watchData[coin].price == 0) {
      // first time seeing this coin
      watchData[coin].price = parseFloat(last);
    } else {
      // we've seen this coin before, update the price accordingly
      const percentChange = watchData[coin].percent / 100;

      const low = 1 - percentChange;
      const high = 1 + percentChange;

      if ((watchData[coin].goals.high !== 0) && (last > watchData[coin].goals.high)) {
        watchData[coin].price = last;
        sendMessage(`${coin.slice(4)} passed your high: ${last} - new high is ${last * 1.06}`);
        watchData[coin].goals.high = toDecimalPlaces(8, last * 1.06);
        console.log(watchData[coin].goals.high);
      } else if ((watchData[coin].goals.low !== 0) && (parseFloat(last) < watchData[coin].goals.low)) {
        watchData[coin].price = last;
        sendMessage(`${coin.slice(4)} sunk to your low: ${last} - new low is ${last * .94}`);
        watchData[coin].goals.low = toDecimalPlaces(8, last * .94);
      } else {
          if (last / watchData[coin].price >= high) {
            // set the new value of the coin
            watchData[coin].price = parseFloat(last);
            sendMessage(`${coin.slice(4)} is UP to ${last}`);

          } else if(last / watchData[coin].price <= low) {
              watchData[coin].price = parseFloat(last);
              sendMessage(`${coin.slice(4)} is DOWN to ${last}`);
          }
      }
    }
  }
}

function sendMessage(text) {
  nexmo.message.sendSms(keys.virtualNum, keys.myNum, text,
    (err, responseData) => {
      if (err) {
        console.log(err);
      }
    });
}

function toDecimalPlaces(n, val) {
  console.log( Math.floor(Math.pow(10, n) * val) / Math.pow(10, n));
  return ( Math.floor(Math.pow(10, n) * val) / Math.pow(10, n));
}