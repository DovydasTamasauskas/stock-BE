const CONST = require("../consts/const");
const fetch = require("node-fetch");
const doubleSort = require("double-sort");
const sort = require("./sort");

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

const getDateToString = async (indicator) =>
  fetch(`${CONST.HOST}?Get,${indicator},${CONST.STOCKS[0]}`)
    .then((res) => res.text())
    .then((res) => JSON.parse(res))
    .then((res) => res["Meta Data"]["3: Last Refreshed"]);

const getTechData = async (indicator) => {
  const techData = await fetchTechData(indicator);
  const result = sort(techData);
  console.log(result);
  return result;
};

const fetchTechData = async (indicator) => {
  const date = await getDateToString(indicator);
  return Promise.all(
    CONST.STOCKS.map(async (stock) =>
      fetch(`${CONST.HOST}?Get,${indicator},${stock}`)
        .then((res) => res.text())
        .then((res) => JSON.parse(res))
        .then((res) => ({
          symbol: res["Meta Data"]["1: Symbol"],
          data: parseTechData(
            indicator,
            res[`Technical Analysis: ${indicator}`][date]
          ),
        }))
        .catch((error) => {
          console.log("unfetched ", stock);
          //  fetch(`${CONST.HOST}?${CONST.KEY},${indicator},${stock}`);
        })
    )
  );
};
const parseTechData = (indicator, data) => {
  switch (indicator) {
    case CONST.RSI:
      return parseFloat(data[indicator]);
    case CONST.MACD:
      return parseMACD(data);
  }
};

const parseMACD = (data) => {
  return {
    MACD_Hist: parseFloat(data["MACD_Hist"]),
    MACD: parseFloat(data["MACD"]),
    MACD_Signal: parseFloat(data["MACD_Signal"]),
  };
};

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

module.exports = {
  findDuplicates: function (arr) {
    findDuplicates(arr);
  },
  getDateToString: function (minus) {
    return getDateToString(minus);
  },
  getDateToString: function (minus) {
    return getDateToString(minus);
  },
  getTechData: getTechData,
  toArray: toArray,
};
