#!/usr/bin/env node

import { CommanderError, program } from "commander";

program.description("A CLI for auditing node package licenses.");

program.showHelpAfterError();

try {
  program.parse();
} catch (e) {
  // if the error is a derivative of CommanderError
  // respect the suggested exitCode and display the error
  // message in most cases
  if (e instanceof CommanderError) {
    const commanderError = e as CommanderError;

    // suppress the "(output help)" message to console, output others
    if (commanderError.code !== "commander.help") {
      console.log(commanderError.message);
    }

    // exit with the suggested exit code
    process.exit(commanderError.exitCode);
  } else {
    const error = e as Error;

    // this is a hard (unexpected) error
    // output message and stack trace, exiting with error code
    console.error(`Message: ${error.message}`);

    if (error.cause) {
      console.error(`Cause: ${error.cause}`);
    }

    if (error.stack) {
      console.error("Stacktrace:");
      console.error((error as Error).stack);
    }

    process.exit(1);
  }
}
