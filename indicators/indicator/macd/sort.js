module.exports = function (arr) {
  // thow if we don't have correct args
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array as first argument");
  }

  if (arr.length === 0) return arr;

  return arr.sort(function (a, b) {
    return Math.abs(a.data.MACD - a.data.MACD_Signal) <
      Math.abs(b.data.MACD - b.data.MACD_Signal)
      ? -1
      : 1;
  });
};
