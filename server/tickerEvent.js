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

      if (last / watchData[coin].price >= high) {
        // set the new value of the coin
        watchData[coin].price = parseFloat(last);
        sendMessage(`${coin.slice(4)} is at ${last}`);

      } else if(last / watchData[coin].price <= low) {
          watchData[coin].price = parseFloat(last);
          sendMessage(`${coin.slice(4)} is at ${last}`);
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