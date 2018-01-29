[![Build Status][image]][travis-url]


### Types
Time : Human readable string without time zone considered (UTC). Only support `MM/DD/YYYY HH:mm` format by moment.js. See [details](http://momentjs.com/docs/#/parsing/string-format/)
- eg) 01/21/2018 09:30

Account : 20 Bytes Ethereum account starting with "0x"
- eg) 0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c

Uint : Unsigned Integer.

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
    max_cap : Number, // decimals considered
    min_cap : Number, // decimals considered
    start_time : Time,
    end_time : Time,
    bonus_coeff: 100, // value to calculate bonus rate. if bonus_coeff is 100, bonus is 10, then the bonus are 10%
    rate: {
      is_static: Boolean,
      base_rate: Number,
      bonus: { // only required for dynamic bonus
        use_time_bonus : Boolean,
        use_amount_bonus : Boolean,
        time_bonuses : [ { bonus_time_stage: Time, bonus_time_ratio: Number } ],
        amount_bonuses : [ { bonus_amount_stage: Number, bonus_amount_ratio: Number } ]
      }
    },
    distribution: {
      token : [ { token_holder: "crowdsale" | "locker" | Account, token_ratio : Number } ], // index 0 item must be { account: "crowdsale", ratio: 0.80 }
      ether : [ { ether_holder: Account, ether_ratio : Number } ]
    },
    valid_purchase: {
      max_purchase_limit : Number, // ( 0 for no limit )
      min_purchase_limit : Number  // ( 0 for no limit )
    },
    kyc: {
      kyc_for_mainsale : Boolean,
      kyc_for_presale : Boolean
    },
    new_token_owner : Account,
    multisig : {
      multisig_use : Boolean,
      num_multisig : Number,
      multisig_owner : [ Account ]
    }
  },
  locker : {
    use_locker : Boolean,
    num_locker : Number,
    locker_options : [
      {
        is_straight : Boolean, // locking type : straight, variable
        release : [ { relase_time: Time, release_ratio: Number } ], // A single release for simple locker (release time & 100% ratio)
        distribution: [ { account: String, ratio: Number } ]
      }
    ],
    ratio: Number // The ratio designated to this locker
  }
}
```


[image]: https://secure.travis-ci.org/Onther-Tech/tokyo-schema.png?branch=master

[travis-url]: https://secure.travis-ci.org/Onther-Tech/tokyo-schema
