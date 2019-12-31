const yaml = require("js-yaml");
const fs = require("fs");
const jsonToEnv = require("./jsonToEnv");

const paramsGen = (inputfile, outputfile) => {
  try {
    const config = yaml.safeLoad(fs.readFileSync(inputfile, "utf8"));

    var env;
    if (process.env.ENV_TYPE) {
      switch (process.env.ENV_TYPE) {
        case "uat":
          env = "uat";
          break;
        case "production":
          env = "production";
          break;
        default:
          env = "development";
      }
      const output = jsonToEnv(config[env], []);
      fs.writeFile(outputfile, JSON.stringify(output, null, 2), err => {
        // In case of a error throw err.
        if (err) throw err;
      });
    } else {
      console.log("ENV_TYPE not set");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = paramsGen;
