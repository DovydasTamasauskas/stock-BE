const HELPER = require("../helper");

const parseTechData = (data) => ({
  low: parseFloat(data["3. low"]),
  volume: parseFloat(data["6. volume"]),
});

const response = async (indicator, res, date) => ({
  symbol: res["Meta Data"]["2. Symbol"],
  data: parseTechData(res["Time Series (Daily)"][date]),
});

const getDailyTechData = async (indicator) => {
  const techData = await HELPER.fetchTechData(indicator, response);
  const result = techData;
  // const result = techData;
  console.log(result);
  return result;
};

module.exports = {
  getTechData: getDailyTechData,
};
