const sort = require("./sort");
const HELPER = require("../../utils/helper");
const C = require("../../utils/const");

const response = async (indicator, res, date) => ({
  symbol: res["Meta Data"]["1: Symbol"],
  data: parseFloat(res[`Technical Analysis: ${indicator}`][date][indicator]),
});

const getTechData = async (indicator, { post, print }) => {
  const result = await HELPER.fetchTechData(indicator, {
    response,
    post,
    sort: (v) => v,
  });
  print && console.log(result);
  return result;
};

module.exports = {
  getTechData: (params) => getTechData(C.SMA, params),
};
