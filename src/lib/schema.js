import Joi from "./Joi";

import { Account, Time } from "./types";

module.exports = Joi.object().keys({
  token: Joi.object().keys({
    is_minime: Joi.bool().required(),
    token_option: Joi.object().keys({
      burnable: Joi.bool().required(),
      pausable: Joi.bool().required(),
      vesting: Joi.bool().required(),
    }),
    token_name: Joi.string().required(),
    token_symbol: Joi.string().required(),
    decimal: Joi.number().min(0).max(32),
  }),
});
