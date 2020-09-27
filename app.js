const fetch = require("node-fetch");
const HELPER = require("./indicators/utils/helper");
const C = require("./indicators/utils/const");
const SMA = require("./indicators/indicator/sma/sma");
const RSI = require("./indicators/indicator/rsi/rsi");
const DAILY = require("./indicators/indicator/daily/daily");
const MACD = require("./indicators/indicator/macd/macd");

const params = {
  post: true,
  print: true,
};

const calculate = async () => {
  const rsi = await RSI.getTechData(params);
  const macd = await MACD.getTechData(params);
  const sma = await SMA.getTechData(params);
  const daily = await DAILY.getTechData(params);

  // less 100,000 volume
  // sma bellow chart
  // rsi < 35

  // let rsi35 = rsi.filter((x) => x <= 35);
  // let result = [];
  // for (let i = 0; i < daily.length; i++) {
  //   for (let ii = 0; ii < sma.length; ii++) {
  //     if (daily[i].symbol === sma[ii].symbol) {
  //       // console.log(daily[i].symbol);
  //       if (daily[i].data.low > sma[ii].data) {
  //         result.push(sma[ii].symbol);
  //       }
  //     }
  //   }
  // }
  // console.log("result", result);
};
calculate();
