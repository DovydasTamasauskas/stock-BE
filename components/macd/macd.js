const sort = require("./sort");
const HELPER = require("../helper");

const parseMACD = (data) => ({
  MACD_Hist: parseFloat(data["MACD_Hist"]),
  MACD: parseFloat(data["MACD"]),
  MACD_Signal: parseFloat(data["MACD_Signal"]),
});

const response = async (indicator, res, date) => ({
  symbol: res["Meta Data"]["1: Symbol"],
  data: parseMACD(res[`Technical Analysis: ${indicator}`][date]),
});

const getTechData = async (indicator) => {
  const techData = await HELPER.fetchTechData(indicator, response);
  const result = sort(techData);
  // const result = techData;
  console.log(result);
  return result;
};

module.exports = {
  getTechData: getTechData,
};
