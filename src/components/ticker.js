/**
 * Logic for ticker
 */

import * as CONST from '../CONST.js';
import { plot_ticker, INDEX_STATE } from '../index.js';

/** 
 * Sets up the ticker popup
 */
export function init_ticker (
  name_text, 
  ticker_popup_wrapper, 
  ticker_popup,
  chart_price, 
  chart_indicator_top, 
  chart_indicator_bot
) {
  // Toggle ticker popup
  name_text.onclick = () => {
    if (ticker_popup_wrapper.style.display === 'none') {
      ticker_popup_wrapper.style.display = 'block';
    } else {
      ticker_popup_wrapper.style.display = 'none';
    }
  };

  // Add tickers
  for (let i = 0; i < CONST.TICKER_LIST.length; i++) {
    let curr_ticker_sel = document.createElement('div');

    curr_ticker_sel.innerHTML = 
    `
    <div>
      ${CONST.TICKER_LIST[i]}
    </div>
    `;

    curr_ticker_sel.classList.add('ticker_option');
    curr_ticker_sel.onclick = () => {
      ticker_popup_wrapper.style.display = 'none';

      if (INDEX_STATE.curr_ticker != CONST.TICKER_LIST[i]) {
        // Reset the plots
        chart_price.reset();
        chart_indicator_bot.reset();
        chart_indicator_top.reset();

        // Update the new ticker
        INDEX_STATE.curr_ticker = CONST.TICKER_LIST[i];

        // Plot the new ticker
        plot_ticker (
          CONST.TICKER_LIST[i], 
          INDEX_STATE.curr_timescale,
          name_text,
          chart_price, 
          chart_indicator_top, 
          chart_indicator_bot
        );
      }
    };

    ticker_popup.appendChild(curr_ticker_sel);
  }
}