import mongoose from "mongoose"

const expenseSchema= new mongoose.Schema({
    title:String,
    cost:Number,
    category:String,
    date: {type:Date, default:Date.now}
})

const expenses= mongoose.model("exps",expenseSchema);

export default expenses;