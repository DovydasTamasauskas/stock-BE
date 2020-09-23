const sort = require("./sort");
const HELPER = require("../helper");

const response = async (indicator, res, date) => ({
  symbol: res["Meta Data"]["1: Symbol"],
  data: parseFloat(res[`Technical Analysis: ${indicator}`][date][indicator]),
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
