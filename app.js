const fetch = require("node-fetch");
const cron = require("node-cron");

const HELPER = require("./indicators/utils/helper");
const C = require("./indicators/utils/const");
const SMA = require("./indicators/indicator/sma/sma");
const RSI = require("./indicators/indicator/rsi/rsi");
const DAILY = require("./indicators/indicator/daily/daily");
const MACD = require("./indicators/indicator/macd/macd");


var count = 0;

var response = async () => {
  fetch(`${C.HOST}?Get,Analysis,MyList`)
    .then((res) => {
      return res.text();
    })
    .then(body => {
      var split = body.split('-');
      if(split.length > 1) {
        console.log("starting corn job... MyList");
        // calculate(split);
       cornJob(split);
      }else{
        console.log("starting corn job... DEFAULT");
        cornJob(C.STOCKS);
      }
    })
    .catch((error) => {
      console.log("ERROR fetching MyList ", error);
      cornJob(C.STOCKS);
    });
}

response();

var cornJob = async (STOCKS) => {
  cron.schedule("* * * * *", function () {
    if(count == STOCKS.length){
      calculate(STOCKS);
      // process.exit();
    }else{
      console.log(STOCKS[count], STOCKS.length - count);
      fetch(`${C.HOST}?${C.KEY},${C.DAILY},${STOCKS[count]}`);
      fetch(`${C.HOST}?${C.KEY},${C.EMA},${STOCKS[count]}`);
      fetch(`${C.HOST}?${C.KEY2},${C.RSI},${STOCKS[count]}`);
      fetch(`${C.HOST}?${C.KEY2},${C.MACD},${STOCKS[count]}`);
      // fetch(`${C.HOST}?${C.KEY},${C.SMA},${STOCKS[count]}`);
      count++;
    }
  });
}

const params = {
  post: true
};

const calculate = async (STOCKS) => {
  console.log("Calculating RSI");
  const rsi = await RSI.getTechData(params, STOCKS);
  process.exit();
};

