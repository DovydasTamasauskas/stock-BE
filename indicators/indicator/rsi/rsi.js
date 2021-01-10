const sort = require("./sort");
const HELPER = require("../../utils/helper");
const C = require("../../utils/const");

const response = async (indicator, res, date) => ({
  symbol: res["Meta Data"]["1: Symbol"],
  data: parseFloat(res[`Technical Analysis: ${indicator}`][date][indicator]),
});

const getTechData = async (indicator, { post }, STOCKS) => 
  await HELPER.fetchTechData(indicator, {
    response,
    post,
    sort: (v) => sort(v),
  }, STOCKS);

module.exports = {
  getTechData: (params, STOCKS) => getTechData(C.RSI, params, STOCKS),
};
