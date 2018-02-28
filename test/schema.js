import BigNumber from "bignumber.js";

import Joi from "../src/lib/Joi";
import schema from "../src/index";

const should = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

describe("Input Schema", () => {
  it("sample data 1", () => {
    const data = require("tokyo-test-data/sample1.json");
    const { value, error } = Joi.validate(data, schema);

    (value.sale.coeff instanceof BigNumber).should.be.equal(true);

    should.not.exist(error);
  });
});
