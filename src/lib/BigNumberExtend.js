import BigNumber from "bignumber.js";

export default joi => ({
  base: joi.string(),
  name: "bignumber",
  language: {
    bignumber: "needs to be bignumber integer convertible with bignumber.js",
  },
  pre(value, state, options) {
    return new BigNumber(value);
  },
  rules: [
    {
      name: "uint",
      validate(params, value, state, options) {
        if (!value.isInteger()) {
          return this.createError("string.bignumber", { v: value }, state, options);
        }

        return value;
      },
    },
  ],
});
