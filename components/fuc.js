const CONST = require("../consts/const");
const fetch = require("node-fetch");

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

const getDateToString = (minus) => {
  var dateNow = new Date();
  dateNow.setDate(dateNow.getDate() - minus);
  return (
    dateNow.getFullYear() +
    "-" +
    (dateNow.getMonth() > 9
      ? dateNow.getMonth() + 1
      : "0" + (dateNow.getMonth() + 1)) +
    "-" +
    (dateNow.getDate() > 9 ? dateNow.getDate() : "0" + dateNow.getDate())
  );
};

const date = getDateToString(1);
const getTechData = async (indicator) =>
  Promise.all(
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
          console.log(stock);
          fetch(`${CONST.HOST}?${CONST.KEY},${indicator},${stock}`);
        })
    )
  );

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
};
