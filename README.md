### Types
Time : Human readable string without time zone considered (UTC). Only support `MM/DD/YYYY HH:mm` format by moment.js. See [details](http://momentjs.com/docs/#/parsing/string-format/)
- eg) 01/21/2018 09:30

Account : 20 Bytes Ethereum account starting with '0x'
- eg) 0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c

### Schema

```
{
  token : {
    token_type : {
      is_minime : Boolean,
      token_option : { // only required for MiniMe
        burnable : Boolean,
        pausable : Boolean,
        vesting : Boolean,
      }
    },
    token_name : String,
    token_symbol : String,
    decimal : Number,
  },
  sale : {
    max_cap : Number, // decimal considered
    min_cap : Number, // decimal considered
    start_time : Time,
    end_time : Time,
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
      token : [ { token_holder: "crowdsale" | "locker" | Account, token_ratio : Number } ], // index 0 for { account: 'crowdsale', ratio: 0.80 }
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
        is_straight : Boolean, // locker_type : straight, variable
        locking : [ { locking_stage: Time, locking_ratio: Number } ], //only take 1 for straight vesting locker (cliff time & ratio)
        distribution: [ { account: String, ratio: Number } ]
      }
    ]
  }
}
```
