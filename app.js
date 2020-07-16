const cron = require("node-cron");
const express = require("express");
const fetch = require("node-fetch");
const doubleSort = require("double-sort");
const fun = require("./components/fuc");
const CONST = require("./consts/const");
app = express();
app.listen(3128);

const calculate = async () => {
  const rsi = await fun.fetchData();
  doubleSort(rsi, "data", "symbol");
  console.log(rsi);
};
// calculate();
var count = 0;
cron.schedule("* * * * *", function () {
  console.log(STOCKS.length);
  fetch(`${BACKEND_HOST}?${RSI},${STOCKS[get(count)]}`);
  fetch(`${BACKEND_HOST}?${RSI},${STOCKS[get(count + 1)]}`);
  fetch(`${BACKEND_HOST}?${RSI},${STOCKS[get(count + 2)]}`);
  fetch(`${BACKEND_HOST}?${RSI},${STOCKS[get(count + 3)]}`);
  fetch(`${BACKEND_HOST}?${RSI},${STOCKS[get(count + 4)]}`);
  count += 5;
  if (count > STOCKS.length && count < STOCKS.length + 5) {
    calculate();
  }
});

const get = (index) => (index - 1 >= CONST.STOCKS.length ? "TSLA" : index);

fun.findDuplicates(CONST.STOCKS);
