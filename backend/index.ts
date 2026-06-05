
const CATEGORIES= ["Food","Household","Travel","Entertainment","Bills","Health"]
import "dotenv/config";
const HF_TOKEN = process.env.HF_TOKEN!;

async function classify(text: string): Promise<string> {
    const r = await fetch(
        "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: text,
                parameters: { candidate_labels: CATEGORIES },
            }),
        }
    );
    const data = await r.json();     // [{label, score}, ...] — already sorted
    return data[0].label;            // top prediction
}


import express from "express"
import mongoose from "mongoose"
import cors from "cors";
const app= express();
import expenses from "./database1.js"
import category from "./database2.js"

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017");

app.get("/classify/:text", async (req, res) => {
    res.json({ category: await classify(req.params.text) });
});

app.get("/get",async (req,res)=>{
    const data=await expenses.find();
    res.json(data);
})

app.post("/add",async (req,res)=>{
    const category =
        req.body.category && req.body.category.trim() !== ""
            ? req.body.category
            : await classify(req.body.title);

    const data = await expenses.create({
        title: req.body.title,
        cost: req.body.cost,
        category,
    });
    res.json(data);
})

app.get("/get1",async (req,res)=>{
    const data=await category.find();
    res.json(data);
})

app.get("/totals", async (req, res) => {
    const data = await expenses.aggregate([
        { $group: { _id: "$category", total: { $sum: "$cost" } } },
        { $project: { _id: 0, category: "$_id", total: 1 } }
    ]);
    res.json(data);
    // [{ category: "Food", total: 450 }, { category: "Household", total: 1200 }]
});



app.listen(3003);
