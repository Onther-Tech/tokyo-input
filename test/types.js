import BigNumber from "bignumber.js";
import Joi from "../src/lib/Joi";
import { Account, Time, Uint } from "../src/lib/types";

const should = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

describe("Basic Type", () => {
  describe("Account", () => {
    it("ethereum address test", () => {
      const address = "0x557678cf28594495ef4b08a6447726f931f8d787";

      const { error } = Account().validate(address);

      should.not.exist(error);
    });
  });

  describe("Time", () => {
    it("date format test", () => {
      const dateString = "10/20/2017 04:30";

      const { error } = Time().validate(dateString);

      should.not.exist(error);
    });
  });

  describe("Uint", () => {
    it("should accept positive integer", () => {
      const number = 10;

      const { error } = Uint().validate(number);

      should.not.exist(error);
    });

    it("should deny negative integer", () => {
      const number = -10;

      const { error } = Uint().validate(number);

      should.exist(error);
    });

    it("should deny positive float", () => {
      const number = 10.1;

      const { error } = Uint().validate(number);

      should.exist(error);
    });

    it("should deny negative float", () => {
      const number = -10.2;

      const { error } = Uint().validate(number);

      should.exist(error);
    });
  });

  describe("Joi.string().bignumber()", () => {
    const bnSchema = Joi.bignumber().uint();

    it("should accept positive integer", () => {
      const bnString = "100";

      const { error } = Joi.validate(bnString, bnSchema);

      should.not.exist(error);
    });
  });
});
