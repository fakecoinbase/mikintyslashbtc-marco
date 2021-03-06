/** 
 * @file Functions for requesting data from the Coinbase API
 * @author mikinty
 */

import *  as CONST from './CONST.js';
import { INDEX_STATE } from './index.js';

/**
 * Retrieves price data from the Coinbase API
 * 
 * @param ticker Ticker to get prices of
 * @param timescale Timescale object to calculate timeframe
 */
export async function get_past_prices (
  ticker = INDEX_STATE.curr_ticker, 
  timescale = INDEX_STATE.curr_timescale 
) {
  let curr_time = new Date();
  let end_string = curr_time.toISOString();
  
  return $.ajax({
    url: CONST.REQUEST_CANDLE_URL(ticker),
    data: {
      start: timescale.start_time(curr_time),
      end: end_string,
      granularity: timescale.granularity
    }
  });
}

/**
 * Starts periodic request to update the price
 * @param {*} elem Price ticker object
 */
export function request_again (elem) {
  let prev_price = -1;

  return setInterval (
    () => {
      $.ajax(
        CONST.REQUEST_TICKER_URL(INDEX_STATE.curr_ticker)
      ).then(data => {
        elem.innerHTML = `${INDEX_STATE.curr_ticker}: $${Number(data.price).toFixed(2)}`;

        if (prev_price != -1) {
          let delta = data.price - prev_price;

          elem.classList.remove('update_green');
          elem.classList.remove('update_red');
          if (delta < 0) {
            elem.classList.add('update_red');
          } else if (delta > 0) {
            elem.classList.add('update_green');
          }
        }

        prev_price = data.price;
      }).catch(error => {
        console.log(error);
      });
    },
    CONST.REFRESH_RATE
  );
}