import Joi from "./Joi";

import { Account, Time, Uint } from "./types";

// TODO: use `when` to conditional verification
module.exports = Joi.object().keys({
  token: Joi.object().keys({
    token_type: Joi.object().keys({
      is_minime: Joi.bool().required(),
    }).required(),
    token_option: Joi.object().keys({
      burnable: Joi.bool().required(),
      pausable: Joi.bool().required(),
      vesting: Joi.bool(),
    }),
    token_name: Joi.string().required(),
    token_symbol: Joi.string().required(),
    decimals: Uint().min(0).max(32).required(),
  }).required(),
  sale: Joi.object().keys({
    max_cap: Uint().required(),
    min_cap: Uint().required(),
    start_time: Time().required(),
    end_time: Time().required(),
    rate: Joi.object().keys({
      is_static: Joi.bool().required(),
      base_rate: Uint().required(),
      bonus: Joi.object().keys({
        use_time_bonus: Joi.bool().required(),
        use_amount_bonus: Joi.bool().required(),
        bonus_coeff: Uint(),
        time_bonuses: Joi.array().items(
          Joi.object().keys({
            bonus_time_stage: Time().required(),
            bonus_time_ratio: Joi.number().required(),
          }),
        ),
        amount_bonuses: Joi.array().items(
          Joi.object().keys({
            bonus_amount_stage: Joi.number().required(),
            bonus_amount_ratio: Joi.number().required(),
          }),
        ),
      }),
    }).required(),
    distribution: Joi.object().keys({
      token: Joi.array().items(
        Joi.object().keys({
          token_holder: [Joi.string(), Account()], // TODO: both required?
          token_ratio: Joi.number().required(),
        }),
      ).required(),
      ether: Joi.array().items(
        Joi.object().keys({
          ether_holder: Account().required(),
          ether_ratio: Joi.number().required(),
        }),
      ).required(),
    }).required(),
    valid_purchase: Joi.object().keys({
      max_purchase_limit: Joi.number().required(),
      min_purchase_limit: Joi.number().required(),
    }).required(),
    kyc: Joi.object().keys({
      kyc_for_mainsale: Joi.bool().required(),
      kyc_for_presale: Joi.bool().required(),
    }).required(),
    new_token_owner: Account().required(),
    multisig: Joi.object().keys({
      multisig_use: Joi.bool().required(),
      num_multisig: Joi.number().min(0).max(10).required(),
      multisig_owner: Joi.array().items(Account().required()).required(),
    }).required(),
  }).required(),
  locker: Joi.object().keys({
    use_locker: Joi.bool().required(),
    num_locker: Joi.number().min(0).required(),
    locker_options: Joi.array().items(
      Joi.object().keys({
        is_straight: Joi.bool().required(),
        release: Joi.array().items(
          Joi.object().keys({
            release_time: Time().required(),
            release_ratio: Joi.number().required(),
          }),
        ).required(),
        distribution: Joi.array().items(
          Joi.object().keys({
            account: Joi.string().required(),
            ratio: Joi.number().required(),
          }).required(),
        ),
        ratio: Joi.number().required(),
      }),
    ),
  }).required(),
}).required();
