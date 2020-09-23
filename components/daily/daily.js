const CONST = require("../../consts/const");
const fetch = require("node-fetch");
const HELPER = require("../helper");

const getDailyTechData = async (indicator) => {
  const techData = await fetchDailyTechData(indicator);
  const result = techData;
  // const result = techData;
  console.log(result);
  return result;
};

const fetchDailyTechData = async (indicator) => {
  const date = await HELPER.getDateToString(indicator);
  return Promise.all(
    CONST.STOCKS.map(async (stock) =>
      fetch(`${CONST.HOST}?Get,${indicator},${stock}`)
        .then((res) => res.text())
        .then((res) => JSON.parse(res))
        .then((res) => ({
          symbol: res["Meta Data"]["2. Symbol"],
          data: parseTechData(res["Time Series (Daily)"][date]),
        }))
        .catch((error) => {
          console.log("unfetched ", stock);
        })
    )
  );
};

const parseTechData = (data) => {
  return {
    low: parseFloat(data["3. low"]),
    volume: parseFloat(data["6. volume"]),
  };
};

module.exports = {
  getTechData: getDailyTechData,
};
