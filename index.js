#!/usr/bin/env node

const program = require("commander");
const figlet = require("figlet");

process.env.AWS_SDK_LOAD_CONFIG = "1";
const cliName = "cfn-params-gen";

program
  .version("1.0.0")
  .description(
    figlet.textSync(cliName, { horizontalLayout: "full" }) +
      "CloudFormation params generator"
  )
  .usage("<command> <subcommand> [options]");

program
  .command("cfn", "cloudformation helper commands", {
    executableFile: "./commands/generate"
  })
  .command("self", "self manage command", { executableFile: "./commands/self" })
  .on("--help", () => {
    console.log("");
    console.log("To see help text, you can run:");

    console.log("  $ cfn-params-gen --help");
    console.log("  $ cfn-params-gen <command> -h");

    console.log("");
  });

program.parse(process.argv);
