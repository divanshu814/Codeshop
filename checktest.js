const checksum_lib=require('paytmchecksum')
var paytmChecksum=""

var paytmParams={}
const received_data=JSON.parse('{}');

for(var key in recieved_data){
    if(key=='CHECKSUMHASH'){
        paytmChecksum=received_data[key];
    }
    else{
        paytmParams[key]=recieved_data[key];
    }
}

var isValidChecksum=checksum_lib.verifySignature(paytmParams, "",paytmChecksum)
if(isValidChecksum){

}
else{
    
}

