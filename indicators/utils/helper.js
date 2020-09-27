const fetch = require("node-fetch");
const CONST = require("./const");
// const doubleSort = require("double-sort");

const toArray = (data) => {
  let analysis = "";
  data.forEach((x) => (analysis += x.symbol + "-"));
  return analysis.slice(0, -1);
};

const getDateToString = async (indicator) =>
  fetch(`${CONST.HOST}?Get,${indicator},${CONST.STOCKS[0]}`)
    .then((res) => res.text())
    .then((res) => JSON.parse(res))
    .then(
      (res) =>
        res["Meta Data"]["3. Last Refreshed"] ||
        res["Meta Data"]["3: Last Refreshed"]
    );

const fetchData = async (indicator, func) => {
  const date = await getDateToString(indicator);
  return Promise.all(
    CONST.STOCKS.map(async (stock) =>
      fetch(`${CONST.HOST}?Get,${indicator},${stock}`)
        .then((res) => res.text())
        .then((res) => JSON.parse(res))
        .then((res) => func(indicator, res, date))
        .catch((error) => {
          console.log("unfetched ", stock);
          //  fetch(`${CONST.HOST}?${CONST.KEY},${indicator},${stock}`);
        })
    )
  );
};

const fetchTechData = async (indicator, { response, post, sort }) => {
  let data = await fetchData(indicator, response);
  data = data.filter((x) => x);
  data = sort && sort(data);
  post && postAnalysis(data, indicator);
  return data;
};

const postAnalysis = (data, indicator) =>
  fetch(
    `${CONST.HOST}?${CONST.SET},${CONST.ANALYSIS},${indicator},${toArray(data)}`
  );

module.exports = {
  postAnalysis: postAnalysis,
  fetchTechData: fetchTechData,
  toArray: toArray,
};

// const findDuplicates = (arr) => {
//   let sorted_arr = arr.slice().sort();
//   let results = [];
//   for (let i = 0; i < sorted_arr.length - 1; i++) {
//     if (sorted_arr[i + 1] == sorted_arr[i]) {
//       results.push(sorted_arr[i]);
//     }
//   }
//   results.length != 0 && console.log("duplicates stocks", results);
// };
