const mongoose=require("mongoose")
const connectDB = async () => {
   
    try{
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected successfully" )
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB;