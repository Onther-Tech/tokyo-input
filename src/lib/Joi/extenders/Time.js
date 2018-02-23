import moment from "moment";

export default joi => ({
  base: joi.string(),
  name: "Time",
  language: {
    format: "{{q}} needs to valid moment format in UTC",
  },
  rules: [
    {
      name: "format",
      validate(params, value, state, options) {
        const momentValue = moment.utc(value);

        if (!momentValue.isValid()) {
          return this.createError("Time.format", { v: value }, state, options);
        }

        return momentValue.unix();
      },
    },
  ],
});
