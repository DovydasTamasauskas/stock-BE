const sort = require("./sort");
const HELPER = require("../../utils/helper");
const C = require("../../utils/const");

const parseMACD = (data) => ({
  MACD_Hist: parseFloat(data["MACD_Hist"]),
  MACD: parseFloat(data["MACD"]),
  MACD_Signal: parseFloat(data["MACD_Signal"]),
});

const response = async (indicator, res, date) => ({
  symbol: res["Meta Data"]["1: Symbol"],
  data: parseMACD(res[`Technical Analysis: ${indicator}`][date]),
});

const getTechData = async (indicator, { post, print }) => {
  const result = await HELPER.fetchTechData(indicator, {
    response,
    post,
    sort: (v) => sort(v),
  });
  print && console.log(result);
  return result;
};

module.exports = {
  getTechData: (params) => getTechData(C.MACD, params),
};
