const INDIC = require("./components/indic/indic");
const DAILY = require("./components/daily/daily");
const MACD = require("./components/macd/macd");
const C = require("./consts/const");

const calculate = async () => {
  const rsi = await INDIC.getTechData(C.RSI);
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.RSI},${fun.toArray(rsi)}`);
  const macd = await MACD.getTechData(C.MACD);
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.MACD},${fun.toArray(macd)}`);
  const sma = await INDIC.getTechData(C.SMA);
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.SMA},${fun.toArray(sma)}`);
  const daily = await DAILY.getTechData(C.Daily);
  // fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.Daily},${fun.toArray(sma)}`);
};
calculate();
