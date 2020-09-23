const cron = require("node-cron");
const fetch = require("node-fetch");
const doubleSort = require("double-sort");
const INDIC = require("./components/indic/indic");
const DAILY = require("./components/daily/daily");
const MACD = require("./components/macd/macd");
const C = require("./consts/const");
// fun.findDuplicates(C.STOCKS);

const calculate = async () => {
  const rsi = await INDIC.getTechData("RSI");
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.RSI},${fun.toArray(rsi)}`);
  const macd = await MACD.getTechData("MACD");
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.MACD},${fun.toArray(macd)}`);
  const sma = await INDIC.getTechData("SMA");
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.SMA},${fun.toArray(sma)}`);
  const daily = await DAILY.getTechData("Daily");
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.Daily},${fun.toArray(sma)}`);
};
calculate();
