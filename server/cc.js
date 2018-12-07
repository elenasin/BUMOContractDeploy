
//libraries
const BigNumber = require('bignumber.js');
const BumoSDK = require('bumo-sdk');
const {keypair} = require('bumo-encryption');
const privK = process.env.PRIVK;
var fs = require('fs');

//point to test net
const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});


// get the address from private key
// so we only need to provide private key.
function getAddress(privKey) {
   return keypair.getAddress(keypair.getEncPublicKey(privKey));
}

// call the contract method with params by sending assets
// using session variables. 
function sendOperation(session, op) {

   //future contract address 
   let address = session.address;
    let nonce;
    console.log(session);
    return new Promise(function(resolve, reject) {
       //step 1 get source account address
       sdk.account.getNonce(address).then(info => {
          if (info.errorCode !== 0) {
             console.log(info);
             return;
          }
         //step 2 increase nonce
          nonce = new BigNumber(info.result.nonce).plus(1).toString(10);
          console.log(nonce);
       
          
          //step 3 serialize transaction
          //set gas price - transaction fuel price 1000MO
          //set fee limit - 100BU (1BU=10^8MO)
    
          let blobInfo = sdk.transaction.buildBlob({
             sourceAddress: address,
             gasPrice: '1000',
             feeLimit: '10000000000', // 100BU 
             nonce: nonce,
             operations: [ op ],
           });
           const blob = blobInfo.result.transactionBlob;
           //step 4 sign the transaction with private key
           //without this signature blockchain will invalidate the transaction
           const signatureInfo = sdk.transaction.sign({
               privateKeys: [ session.privK ],
               blob,
           });

           //step 5 submit the transaction
           const signature = signatureInfo.result.signatures;
           console.log(signatureInfo);
           sdk.transaction.submit({
             blob,
             signature: signature,
           }).then(data => {
     resolve(data);
           });
       });
    });
}

// call the contract method with params by sending BU
// using session variables. 
function createContract( session ) {

   //future contract address 
   let address = session.address;
   //source file
    let payload;
    try {  
       payload = fs.readFileSync(session.file);
       console.log(payload);
    } catch(e) {
       console.log('Error:', e.stack);
    }
    //build the contract operation
    //set initial contract balance in MO units
    //set source cotract code
    //set source contract address
    const op = sdk.operation.contractCreateOperation({
       initBalance: '100000000',
       payload:payload.toString(),
       sourceAddress:address,
     });

     console.log(op);

    //send the transaction
    return sendOperation(session, op.result.operation);
}


// main procedure
let session={};
session.privK = privK;
session.address = getAddress(privK);
session.file = process.env.FILE;
//create contract based on session data
createContract(session).then(data => {
console.log(data)
});