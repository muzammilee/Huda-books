
const mongoose = require('mongoose')

//taking mongo url
async function dbConnect(){
    await mongoose.connect(process.env.MONGOURL,{
        dbName:'Hudabooks'
    })
    .then(()=>{
        console.log('MongoDb Connected Successfully')
    })
    .catch((err)=>{
        console.log('Error When Connecting MongoDb',err)
    })
}


module.exports=dbConnect
