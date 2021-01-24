const fetch = require("node-fetch");
const cron = require("node-cron");

const C = require("./indicators/utils/const");
const RSI = require("./indicators/indicator/rsi/rsi");

var count = 0;

var response = async () => {
  fetch(`${C.HOST}?Get,Analysis,MyList`)
    .then((res) => {
      return res.text();
    })
    .then((body) => {
      var split = body.split("-");
      if (split.length > 1) {
        console.log("starting corn job... MyList");
        // calculate(split);
        cornJob(split);
      } else {
        console.log("starting corn job... DEFAULT");
        cornJob(C.STOCKS);
      }
    })
    .catch((error) => {
      console.log("ERROR fetching MyList ", error);
      cornJob(C.STOCKS);
    });
};

cron.schedule("0 10 * * *", function () {
  var date = new Date();
  if (date.getDay() != 0 && date.getDay() != 1) {
    count = 0;
    response();
  }
});

var cornJob = async (STOCKS) => {
  var job = cron.schedule("* * * * *", function () {
    if (count == STOCKS.length) {
      calculate(STOCKS);
      job.stop();
    } else {
      console.log(STOCKS[count], STOCKS.length - count);
      fetch(`${C.HOST}?${C.KEY},${C.DAILY},${STOCKS[count]}`);
      fetch(`${C.HOST}?${C.KEY},${C.EMA},${STOCKS[count]}`);
      fetch(`${C.HOST}?${C.KEY2},${C.RSI},${STOCKS[count]}`);
      fetch(`${C.HOST}?${C.KEY2},${C.MACD},${STOCKS[count]}`);
      // fetch(`${C.HOST}?${C.KEY},${C.SMA},${STOCKS[count]}`);
      count++;
    }
  });
};

const params = {
  post: true,
};

const calculate = async (STOCKS) => {
  console.log("Calculating RSI");
  const rsi = await RSI.getTechData(params, STOCKS);
  console.log("program finished job...");
};
