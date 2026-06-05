import mongoose from "mongoose"

const CategoryExpenses= new mongoose.Schema({
    category:String,
    total:Number
})

const category= mongoose.model("cats",CategoryExpenses);

export default category;