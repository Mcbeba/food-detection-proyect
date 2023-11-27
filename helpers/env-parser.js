const env = require("dotenv").config({
  path: `${process.cwd()}/.env`,
});
module.exports = env.parsed