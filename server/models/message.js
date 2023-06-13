import { mongoose } from "mongoose";

const  Schema  = mongoose.Schema

const Message = new Schema({
    message: String,
    from: String
})



export default  mongoose.model('Message', Message)