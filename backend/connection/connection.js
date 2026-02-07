const mongoose=require("mongoose");
async function mongoconnect(url){
return await mongoose.connect(url);
}
module.exports=mongoconnect;