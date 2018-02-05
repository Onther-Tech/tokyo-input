import moment from "moment";
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
    const dateFormat = "YYYY/MM/DD HH:mm:ss";
    it("date format test", () => {
      const dateString = "2017/10/20 04:30:20";

      const { error } = Time().validate(dateString);

      should.not.exist(error);

      const momentValue = moment(dateString, dateFormat);

      momentValue.format(dateFormat)
        .should.be.equal(dateString);
    });
  });

  describe("Uint", () => {
    it("should accept positive integer", () => {
      const number = 10;

      const { error } = Uint().validate(number);

      should.not.exist(error);
    });

    it("should reject negative integer", () => {
      const number = -10;

      const { error } = Uint().validate(number);

      should.exist(error);
    });

    it("should reject positive float", () => {
      const number = 10.1;

      const { error } = Uint().validate(number);

      should.exist(error);
    });

    it("should reject negative float", () => {
      const number = -10.2;

      const { error } = Uint().validate(number);

      should.exist(error);
    });
  });

  describe("Joi.bignumber()", () => {
    describe("#uint", () => {
      const bnSchema = Joi.bignumber().uint();

      it("should reject positive integer as Number", () => {
        const bnString = 100;

        const { error } = Joi.validate(bnString, bnSchema);

        should.exist(error);
      });

      it("should accept positive integer as string", () => {
        const bnString = "100";

        const { error } = Joi.validate(bnString, bnSchema);

        should.not.exist(error);
      });
    });

    describe("#min", () => {
      it("should accept when value is same with the minimum", () => {
        const bnSchema = Joi.bignumber().min("10");
        const bnString = "10";

        const { error } = Joi.validate(bnString, bnSchema);

        should.not.exist(error);
      });

      it("should accept when value is over the minimum", () => {
        const bnSchema = Joi.bignumber().min("10");
        const bnString = "11";

        const { error } = Joi.validate(bnString, bnSchema);

        should.not.exist(error);
      });

      it("should reject when value is under the minimum", () => {
        const bnSchema = Joi.bignumber().min("11");
        const bnString = "10";

        const { error } = Joi.validate(bnString, bnSchema);

        should.exist(error);
      });
    });

    describe("#max", () => {
      it("should accept when value is same with the maximum", () => {
        const bnSchema = Joi.bignumber().max("10");
        const bnString = "10";

        const { error } = Joi.validate(bnString, bnSchema);

        should.not.exist(error);
      });

      it("should accept when value is over the maximum", () => {
        const bnSchema = Joi.bignumber().max("11");
        const bnString = "10";

        const { error } = Joi.validate(bnString, bnSchema);

        should.not.exist(error);
      });

      it("should reject when value is under the maximum", () => {
        const bnSchema = Joi.bignumber().max("10");
        const bnString = "11";

        const { error } = Joi.validate(bnString, bnSchema);

        should.exist(error);
      });
    });
  });
});
