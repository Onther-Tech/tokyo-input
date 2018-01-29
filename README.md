[![Build Status][image]][travis-url]


### Types
Time : Human readable string without time zone considered (UTC). Only support `MM/DD/YYYY HH:mm` format by moment.js. See [details](http://momentjs.com/docs/#/parsing/string-format/)
- eg) 01/21/2018 09:30:00

Account : 20 Bytes Ethereum account starting with "0x"
- eg) 0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c

Uint : `bignumber.js` compatible string for unsigned integer. Check the value with decimals

### Schema

```
{
  token : {
    token_type : {
      is_minime : Boolean,
      token_option : {
        burnable : Boolean,
        pausable : Boolean,
        vesting : Boolean, // only required for MiniMe
      }
    },
    token_name : String,
    token_symbol : String,
    decimals : Number,
  },
  sale : {
    max_cap : Uint, // decimals considered
    min_cap : Uint, // decimals considered
    start_time : Time,
    end_time : Time,
    coeff: Uint, // base value to calculate ratio. if coeff is 1000, ratio value is 20, which means 20/1000 (2%)
    rate: {
      is_static: Boolean,
      base_rate: Uint,
      bonus: { // only required for dynamic bonus
        use_time_bonus : Boolean,
        use_amount_bonus : Boolean,
        time_bonuses : [ { bonus_time_stage: Time, bonus_time_ratio: Uint } ],
        amount_bonuses : [ { bonus_amount_stage: Uint, bonus_amount_ratio: Uint } ]
      }
    },
    distribution: {
      token : [ { token_holder: "crowdsale" | "locker" | Account, token_ratio : Uint } ], // "crowdsale" must be inserted
      ether : [ { ether_holder: Account, ether_ratio : Number } ]
    },
    stages: [ // Define sale stages seperated by times. independent cap could be considered.
      {
        start_time: Time,
        end_time: Time,
        independent_cap_ratio: Uint, // 0 for no seperated cap for the stage
        kyc: Boolean // check kyc for this stage
      }
    ],
    valid_purchase: {
      max_purchase_limit : Uint, // ( 0 for no limit )
      min_purchase_limit : Uint  // ( 0 for no limit )
    },
    new_token_owner : Account,
    multisig : {
      multisig_use : Boolean,
      num_multisig : Number,
      multisig_owner : [ Account ]
    }
  },
  locker : { // Lock tokens and release them periodically (or linearly)
    use_locker : Boolean,
    num_locker : Number,
    locker_options : [
      {
        is_straight : Boolean, // locking type : straight, variable
        release : [ { relase_time: Time, release_ratio: Uint } ], // A single release for simple locker (a single release time & 100% of the token)
        distribution: [ { account: String, ratio: Uint } ]
      }
    ],
    ratio: Uint // The ratio designated to this locker
  }
}
```


[image]: https://secure.travis-ci.org/Onther-Tech/tokyo-schema.png?branch=master

[travis-url]: https://secure.travis-ci.org/Onther-Tech/tokyo-schema
