import Nexmo from 'nexmo';
import autobahn from 'autobahn';
import keys from '../keys';
import { tickerEvent } from './tickerEvent';

// setup connection for polo
const wsuri = 'wss://api.poloniex.com';
const connection = new autobahn.Connection({
  url: wsuri,
  realm: 'realm1'
});

export function initWatch(watchObj) {
  connection.onopen = (session) => {
    console.log('Connection opened, setting up ticket event callback');
    session.subscribe('ticker', tickerEvent);
  }

  connection.onclose = () => {
    console.log('Connection closed.');
  }

  connection.open();
}