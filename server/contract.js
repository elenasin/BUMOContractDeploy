"use strict";

//initializing a contract data
function init(bar)
{
  storageStore('owner', sender);
  return;
}

//main data operation function
function main(input)
{
  //reading parameters
  let para = JSON.parse(input);
  let args = para.params;
  
    
  // withdrawal method
  if (para.method === "withdraw") {
    //check for owner and balance
    if (sender === storageLoad('owner') && 
        int64Compare(getBalance(thisAddress), toBaseUnit("0.1")) === 1) {
          //withdraw
          payCoin(sender,  toBaseUnit("0.1"));
          //record in transaction log
      tlog("withdraw", sender,  toBaseUnit("0.1"));
    }
  }
  else {
    return 'Other method';
  }
}

//read-only function - free query
function query(input)
{ 
  //reading parameters
  let para = JSON.parse(input);
  let args = para.params;

  //query ontract account balance
  if (para.method === "balance") {
    return JSON.stringify(getBalance(thisAddress));
  }
  else {
    return 'Other query';
  }
}

