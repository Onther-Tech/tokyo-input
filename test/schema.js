import path from "path";
import BigNumber from "bignumber.js";

import schema from "../src/index";

const should = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

describe("Input Schema", () => {
  it("sample data 1", () => {
    const data = require("tokyo-test-data/sample1.json");
    const { error } = schema.validate(data);

    should.not.exist(error);
  });
});
