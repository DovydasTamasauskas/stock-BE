module.exports = function (arr) {
  // thow if we don't have correct args
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array as first argument");
  }

  // if we don't have an array of any length, return early
  if (arr.length === 0) return arr;

  return arr.sort((a, b) => (a.data > b.data ? 1 : -1));
};
