const stringCleaner = (str) => {
  return str.replace(/[^a-zA-Z ]/g, "").toLowerCase();
};

module.exports = {stringCleaner};  