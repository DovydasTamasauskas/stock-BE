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
    dateNow.getDate()
  );
};

const fetchData = async () => {
  var result = [];
  for (var i = 0; i < CONST.STOCKS.length; i++) {
    console.log(`${CONST.BACKEND_HOST}?Get,${CONST.RSI},${CONST.STOCKS[i]}`);
    await fetch(`${CONST.BACKEND_HOST}?Get,${CONST.RSI},${CONST.STOCKS[i]}`)
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        result.push({
          symbol: res["Meta Data"]["1: Symbol"],
          data: parseFloat(
            res["Technical Analysis: RSI"][getDateToString(1)]["RSI"]
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return result;
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
  fetchData: fetchData,
};
