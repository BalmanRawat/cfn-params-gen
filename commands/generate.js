const program = require("commander");
const paramsGen = require("../src/cfn-params");

const defaultOutput = "output.json";

program
  .command("generate")
  .description(
    "Converts your custom yaml file to AWS CloudFormation parameters file"
  )
  .usage("--input-file input-file.yaml --output-file output-file.json")
  .option("-i, --input-file <input-file.yaml>", "input file")
  .option(
    "-o, --output-file <output-file.json>",
    "optional flag, if not provided output will be written to output.json file"
  )
  .action(options => {
    try {
      paramsGen(options.inputFile, options.outputFile || defaultOutput);
    } catch (e) {
      logger.error(e.message);
      process.exit(1);
    }
  })
  .on("--help", () => {
    console.log("");
    console.log("Examples:");
    console.log(
      " $ cfn-params-gen --input-file input.yaml --output-file output.json"
    );
  });

program.parse(process.argv);

if (!process.argv.slice(3).length) {
  program.outputHelp();
}
