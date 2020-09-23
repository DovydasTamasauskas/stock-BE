const fetch = require("node-fetch");
const CONST = require("../consts/const");

const toArray = (rsi) => {
  var analysis = "";
  doubleSort(rsi, "data", "symbol")
    .filter((x) => x !== undefined)
    .forEach((x) => {
      if (x.symbol !== undefined || x.symbol !== null) {
        analysis += x.symbol + "-";
      }
    });
  return analysis.slice(0, -1);
};

const getDateToString = async (indicator) =>
  fetch(`${CONST.HOST}?Get,${indicator},${CONST.STOCKS[0]}`)
    .then((res) => res.text())
    .then((res) => JSON.parse(res))
    .then(
      (res) =>
        res["Meta Data"]["3. Last Refreshed"] ||
        res["Meta Data"]["3: Last Refreshed"]
    );

const findDuplicates = (arr) => {
  let sorted_arr = arr.slice().sort();
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(sorted_arr[i]);
    }
  }
  results.length != 0 && console.log("duplicates stocks", results);
};

module.exports = {
  findDuplicates: function (arr) {
    findDuplicates(arr);
  },
  getDateToString: function (indicator) {
    return getDateToString(indicator);
  },
  toArray: toArray,
};
