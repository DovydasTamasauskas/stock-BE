const cron = require("node-cron");
const fetch = require("node-fetch");
const doubleSort = require("double-sort");
const fun = require("./components/fuc");
const C = require("./consts/const");
const sort = require("./components/sort");
// fun.findDuplicates(C.STOCKS);

const calculate = async () => {
  const rsi = await fun.getTechData("RSI");
  fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.RSI},${fun.toArray(rsi)}`);
  const macd = await fun.getTechData("MACD");
  fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.MACD},${fun.toArray(macd)}`);
  const sma = await fun.getTechData("SMA");
  fetch(`${C.HOST}?${C.SET},${C.ANALYSIS},${C.SMA},${fun.toArray(sma)}`);
};
calculate();
