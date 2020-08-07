const cron = require("node-cron");
const fetch = require("node-fetch");
const doubleSort = require("double-sort");
const fun = require("./components/fuc");
const C = require("./consts/const");
const sort = require("./components/sort");
// fun.findDuplicates(C.STOCKS);

const calculate = async () => {
  // const rsi = await fun.getTechData("RSI");
  // console.log(rsi);
  const macd = await fun.getTechData("MACD");
  // sort(macd);
  console.log(sort(macd));
  // doubleSort(rsi, "data", "symbol");
};
calculate();
var count = 0;
// cron.schedule("* * * * *", function () {
//   console.log(C.STOCKS.length - count);
//   fetch(`${C.HOST}?${C.KEY},${C.Daily},${C.STOCKS[get(count)]}`);
//   fetch(`${C.HOST}?${C.KEY},${C.Daily},${C.STOCKS[get(count + 1)]}`);
//   fetch(`${C.HOST}?${C.KEY},${C.Daily},${C.STOCKS[get(count + 2)]}`);
//   fetch(`${C.HOST}?${C.KEY},${C.Daily},${C.STOCKS[get(count + 3)]}`);
//   fetch(`${C.HOST}?${C.KEY},${C.Daily},${C.STOCKS[get(count + 4)]}`);
//   count += 5;
//   if (count > C.STOCKS.length && count < C.STOCKS.length + 5) {
//     calculate();
//   }
// });

const get = (index) => (index - 1 >= C.STOCKS.length ? "TSLA" : index);
