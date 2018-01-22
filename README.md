### Types
Time : Human readable string, parsed by [this api](https://momentjs.com/docs/#/parsing/string/). No time zone considered (UTC)
- eg) 2013-02-08 09:30

Account : 20 Bytes Ethereum account starting with '0x'
- eg) 0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c

### Input Scheme

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
    max_cap : String,
    min_cap : String,
    start_time : Time,
    end_time : Time,
    rate: {
      is_static: Boolean,
      base_rate: Number,
      bonus: { // only required for dynamic bonus
        use_time_bonus : Boolean,
        use_amount_bonus : Boolean,
        time_bonuses : [ { bonus_time_stage: Time, bonus_ratio: Number } ],
        amount_bonuses : [ { bonus_amount_stage: Number, bonus_ratio: Number } ]
      }
    },
    distribution: {
      token : [ { account: String | Account, ratio : Number } ], // index 0 for { account: 'crowdsale', ratio: 80% }
      ether : [ { account: String, ratio : Number } ]
    },
    valid_purchase: {
      max_purchase_limit : Number, // ( 0 for no limit )
      min_purchase_limit : Number  // ( 0 for no limit )
    },
    kyc: {
      use_kyc : Boolean,
      kyc_for_presale : Boolean
    }
    new_token_owner : String,
    multisig : {
      multisig_use : Boolean,
      num_multisig : Number,
      multisig_owner : [ String ]
    }
  },
  locker : {
    use_locker : Boolean,
    num_lockers : Number,
    locker_options : [
      {
        no_vesting : Boolean,
        vesting : [ { vesting_stage: Time, vesting_amount: Number } ],
        distribution: [ { account: Strubg, ratio: Number } ]    
      }
    ]
  }
}
```
