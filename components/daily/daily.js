const HELPER = require("../helper");
const C = require("../../consts/const");

const parseTechData = (data) => ({
  low: parseFloat(data["3. low"]),
  volume: parseFloat(data["6. volume"]),
});

const responseStruc = async (indicator, res, date) => ({
  symbol: res["Meta Data"]["2. Symbol"],
  data: parseTechData(res["Time Series (Daily)"][date]),
});

const getDailyTechData = async (indicator) => {
  const techData = await HELPER.fetchTechData(indicator, responseStruc);
  const result = techData;
  // const result = techData;
  console.log(result);
  return result;
};

module.exports = {
  getTechData: () => getDailyTechData(C.Daily),
};
