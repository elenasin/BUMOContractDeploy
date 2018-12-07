Deploy BUMO Contract Reference:

Create Account (Wallet) 
on test network: https://quickwallet.bumotest.io
on main network: https://quickwallet.bumo.io

BUMO Explorer:
on test network: https://explorer.bumotest.io/
on main network: https://explorer.bumo.io/

Get test tokens:
email to elena.sinelnikova@gmail.com

Deploy contract:
in Command Prompt (Administrative rights)
cd server
npm install
set PRIVK=...
set FILE=contract.js
node cc.js

Result should look like this:

<Buffer 22 75 73 65 20 73 74 72 69 63 74 22 3b 0d 0a 0d 0a 2f 2f 69 6e 69 74 69 61 6c 69 7a 69 6e 67 20 61 20 63 6f 6e 74 72 61 63 74 20 64 61 74 61 0d 0a 66 ... >
{ errorCode: 0,
  errorDesc: '',
  result: { operation: { type: 'contractCreate', data: [Object] } } }
{ privK: '....',
  address: 'buQg2Jhy12sCkNUJQmr9DvR9S73JYi9qLRKf',
  file: 'contract.js' }
686
{ errorCode: 0,
  errorDesc: '',
  result: { signatures: [ [Object] ] } }
{ errorCode: 0,
  errorDesc: '',
  result:
   { hash:
      '17e2ffe646bcd7fcf2658e1d0cef73f4f008161b291f8b4ed4c5687a655aeb48' } }
      
      
Copy-paste resulting hash (17e2ffe646bcd7fcf2658e1d0cef73f4f008161b291f8b4ed4c5687a655aeb48) to BUMO Explorer
to check that your contract is deployed







