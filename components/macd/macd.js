const CONST = require("../../consts/const");
const fetch = require("node-fetch");
const sort = require("./sort");
const HELPER = require("../helper");

const getTechData = async (indicator) => {
  const techData = await fetchTechData(indicator);
  const result = sort(techData);
  // const result = techData;
  console.log(result);
  return result;
};

const fetchTechData = async (indicator) => {
  const date = await HELPER.getDateToString(indicator);
  return Promise.all(
    CONST.STOCKS.map(async (stock) =>
      fetch(`${CONST.HOST}?Get,${indicator},${stock}`)
        .then((res) => res.text())
        .then((res) => JSON.parse(res))
        .then((res) => ({
          symbol: res["Meta Data"]["1: Symbol"],
          data: parseMACD(res[`Technical Analysis: ${indicator}`][date]),
        }))
        .catch((error) => {
          console.log("unfetched ", stock);
          //  fetch(`${CONST.HOST}?${CONST.KEY},${indicator},${stock}`);
        })
    )
  );
};

const parseMACD = (data) => {
  return {
    MACD_Hist: parseFloat(data["MACD_Hist"]),
    MACD: parseFloat(data["MACD"]),
    MACD_Signal: parseFloat(data["MACD_Signal"]),
  };
};

module.exports = {
  getTechData: getTechData,
};
