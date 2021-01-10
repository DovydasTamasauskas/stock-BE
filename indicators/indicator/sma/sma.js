const sort = require("./sort");
const HELPER = require("../../utils/helper");
const C = require("../../utils/const");
const moment = require('moment');

const getDays = (res, indicator, count) => {
    var days = 0;
    var results = [];

    while(count > 0){
      var date = new Date();
      date.setDate(date.getDate()-days);
      if(res[`Technical Analysis: ${indicator}`][moment(date).format('YYYY-MM-DD')] !== undefined){
        results.push(moment(date).format('YYYY-MM-DD'));
        count--;
      }
      days++;
    }
    return results;
}

const response = async (indicator, res, date) => {
  const date2 = getDays(res, indicator, 10);
  return ({
    symbol: res["Meta Data"]["1: Symbol"],
    data: date2.map(x=>parseFloat(res[`Technical Analysis: ${indicator}`][x][indicator])),
  })
};

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
