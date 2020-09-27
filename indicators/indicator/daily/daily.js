const HELPER = require("../../utils/helper");
const C = require("../../utils/const");

const parseTechData = (data) => ({
  low: parseFloat(data["3. low"]),
  volume: parseFloat(data["6. volume"]),
});

const response = async (indicator, res, date) => ({
  symbol: res["Meta Data"]["2. Symbol"],
  data: parseTechData(res["Time Series (Daily)"][date]),
});

const getDailyTechData = async (indicator, { post, print }) => {
  const result = await HELPER.fetchTechData(indicator, {
    response,
    post,
    sort: (v) => v,
  });
  print && console.log(result);
  return result;
};

module.exports = {
  getTechData: (params) => getDailyTechData(C.Daily, params),
};
