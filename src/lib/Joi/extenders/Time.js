import moment from "moment";

export default joi => ({
  base: joi.string(),
  name: "Time",
  language: {
    utc: "{{q}} needs to valid moment time in UTC",
  },
  rules: [
    {
      name: "utc",
      validate(params, value, state, options) {
        const momentValue = moment.utc(value);

        if (!momentValue.isValid()) {
          return this.createError("Time.utc", { v: value }, state, options);
        }

        return momentValue.unix();
      },
    },
  ],
});
