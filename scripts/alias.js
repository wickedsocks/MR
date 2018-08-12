const { execSync } = require("child_process");
const arg = process.argv[2];
execSync(`now alias ${arg} www.mykhailovskie-ryadi.com`);

