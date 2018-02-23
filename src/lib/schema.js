import Joi from "./Joi";

// TODO: use `when` to conditional verification
module.exports = Joi.object().keys({
  project_name: Joi.string().required(),
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
    max_cap: Joi.BigNumber().uint().required(),
    min_cap: Joi.BigNumber().uint().required(),
    start_time: Joi.Time().required(),
    end_time: Joi.Time().required(),
    coeff: Joi.BigNumber().uint().required(),
    rate: Joi.object().keys({
      is_static: Joi.bool().required(),
      base_rate: Joi.BigNumber().uint().required(),
      bonus: Joi.object().keys({
        use_time_bonus: Joi.bool().required(),
        use_amount_bonus: Joi.bool().required(),
        time_bonuses: Joi.array().items(Joi.object().keys({
          bonus_time_stage: Joi.Time().required(),
          bonus_time_ratio: Joi.BigNumber().uint().required(),
        })),
        amount_bonuses: Joi.array().items(Joi.object().keys({
          bonus_amount_stage: Joi.BigNumber().uint().required(),
          bonus_amount_ratio: Joi.BigNumber().uint().required(),
        })),
      }),
    }).required(),
    distribution: Joi.object().keys({
      token: Joi.array().items(Joi.object().keys({
        token_holder: [Joi.string(), Joi.Account()], // TODO: both required?
        token_ratio: Joi.BigNumber().uint().required(),
      })).required(),
      ether: Joi.array().items(Joi.object().keys({
        ether_holder: Joi.Account().required(),
        ether_ratio: Joi.BigNumber().uint().required(),
      })).required(),
    }).required(),
    stages: Joi.array().items(Joi.object().keys({
      start_time: Joi.Time().required(),
      end_time: Joi.Time().required(),
      cap_ratio: Joi.BigNumber().uint().required(),
      max_purchase_limit: Joi.BigNumber().uint().required(),
      min_purchase_limit: Joi.BigNumber().uint().required(),
      kyc: Joi.bool().required(),
    })).required(),
    valid_purchase: Joi.object().keys({
      max_purchase_limit: Joi.BigNumber().uint().required(),
      min_purchase_limit: Joi.BigNumber().uint().required(),
      block_interval: Joi.number().integer().positive(),
    }).required(),
    new_token_owner: Joi.Account().required(),
    multisig: Joi.object().keys({
      multisig_use: Joi.bool().required(),
      num_multisig: Joi.number().min(0).max(10).required(),
      multisig_owner: Joi.array().items(Joi.Account().required()).required(),
    }).required(),
  }).required(),
  locker: Joi.object().keys({
    use_locker: Joi.bool().required(),
    beneficiaries: Joi.array().items(Joi.object().keys({
      address: Joi.Account(), // TODO: multisig
      ratio: Joi.BigNumber().uint().required(),
      is_straight: Joi.bool().required(),
      release: Joi.array().items(Joi.object().keys({
        release_time: Joi.Time().required(),
        release_ratio: Joi.BigNumber().uint().required(),
      })).required(),
    })),
  }).required(),
}).required();
