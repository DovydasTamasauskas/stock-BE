const sort = require("./sort");
const HELPER = require("../helper");
const C = require("../../consts/const");

const responseStruc = async (indicator, res, date) => ({
  symbol: res["Meta Data"]["1: Symbol"],
  data: parseFloat(res[`Technical Analysis: ${indicator}`][date][indicator]),
});

const getTechData = async (indicator) => {
  const techData = await HELPER.fetchTechData(indicator, responseStruc);
  const result = sort(techData);
  // const result = techData;
  console.log(result);
  return result;
};

module.exports = {
  getTechData: () => getTechData(C.SMA),
};
