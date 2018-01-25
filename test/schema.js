import path from "path";
import BigNumber from "bignumber.js";

import schema from "../src/index";

const should = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const dataDir = path.resolve(__dirname, "./tokyo-test-data");

describe("Input Schema", () => {
  it("sample data 1", () => {
    const data = require(path.resolve(dataDir, "./sample1.json"));
    const { error } = schema.validate(data);

    should.not.exist(error);
  });
});
