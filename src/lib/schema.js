import Joi from "./Joi";

import { Account, Time } from "./types";

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
    decimals: Joi.number().min(0).max(32).required(),
  }).required(),
  sale: Joi.object().keys({
    max_cap: Joi.bignumber().uint().required(),
    min_cap: Joi.bignumber().uint().required(),
    start_time: Time().required(),
    end_time: Time().required(),
    coeff: Joi.bignumber().uint().required(),
    rate: Joi.object().keys({
      is_static: Joi.bool().required(),
      base_rate: Joi.bignumber().uint().required(),
      bonus: Joi.object().keys({
        use_time_bonus: Joi.bool().required(),
        use_amount_bonus: Joi.bool().required(),
        time_bonuses: Joi.array().items(
          Joi.object().keys({
            bonus_time_stage: Time().required(),
            bonus_time_ratio: Joi.bignumber().uint().required(),
          }),
        ),
        amount_bonuses: Joi.array().items(
          Joi.object().keys({
            bonus_amount_stage: Joi.bignumber().uint().required(),
            bonus_amount_ratio: Joi.bignumber().uint().required(),
          }),
        ),
      }),
    }).required(),
    distribution: Joi.object().keys({
      token: Joi.array().items(
        Joi.object().keys({
          token_holder: [Joi.string(), Account()], // TODO: both required?
          token_ratio: Joi.bignumber().uint().required(),
        }),
      ).required(),
      ether: Joi.array().items(
        Joi.object().keys({
          ether_holder: Account().required(),
          ether_ratio: Joi.bignumber().uint().required(),
        }),
      ).required(),
    }).required(),
    stages: Joi.array().items(Joi.object().keys({
      start_time: Time().required(),
      end_time: Time().required(),
      cap_ratio: Joi.bignumber().uint().required(),
      max_purchase_limit: Joi.bignumber().uint().required(),
      min_purchase_limit: Joi.bignumber().uint().required(),
      kyc: Joi.bool().required(),
    })).required(),
    valid_purchase: Joi.object().keys({
      max_purchase_limit: Joi.bignumber().uint().required(),
      min_purchase_limit: Joi.bignumber().uint().required(),
      block_interval: Joi.number().integer().positive(),
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
            release_ratio: Joi.bignumber().uint().required(),
          }),
        ).required(),
        beneficiaries: Joi.array().items(
          Joi.object().keys({
            account: Joi.string().required(),
            ratio: Joi.bignumber().uint().required(),
          }).required(),
        ),
        ratio: Joi.bignumber().uint().required(),
      }),
    ),
  }).required(),
}).required();
