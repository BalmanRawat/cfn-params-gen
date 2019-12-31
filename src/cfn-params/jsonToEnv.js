//find and replace all the existing variable in the form ${variable} with their respective environment variable process.env[variable]
const evaluateEnv = varString =>
  varString.replace(/\${(\w+)}/g, (_, txt) => process.env[txt] || "");

function jsonToEnv(json, parameters) {
  const keys = Object.keys(json);

  keys.forEach(key => {
    let value = json[key];

    switch (typeof value) {
      case "string":
        parameters.push({
          ParameterKey: key,
          ParameterValue: evaluateEnv(value)
        });
        break;

      case "object":
        jsonToEnv(value, parameters);
        break;

      default:
        break;
    }
  });
  return parameters;
}

module.exports = jsonToEnv;
