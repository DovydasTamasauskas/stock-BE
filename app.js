const SMA = require("./components/sma/sma");
const RSI = require("./components/rsi/rsi");
const DAILY = require("./components/daily/daily");
const MACD = require("./components/macd/macd");

const calculate = async () => {
  const rsi = await RSI.getTechData();
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.RSI},${fun.toArray(rsi)}`);
  const macd = await MACD.getTechData();
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.MACD},${fun.toArray(macd)}`);
  const sma = await SMA.getTechData();
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.SMA},${fun.toArray(sma)}`);
  const daily = await DAILY.getTechData();
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.Daily},${fun.toArray(sma)}`);
};
calculate();
