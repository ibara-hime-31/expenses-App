import axios from "axios"
import { useState } from "react"
import "./CreateExpense.css"

const CreateExpense = () => {
    const [t,addT]=useState("")
    const [cat,addCat]=useState("")
    const [co,addCo]=useState("")
    const handleClick=()=>{
        axios.post("http://localhost:3003/add",{
            title:t,
            category:cat,
            cost:co
        }).then(() => window.location.reload())
            .catch(err => console.log(err))
    }
  return (
    <div className="container">
        <h3>New Expense</h3>
        <input type="text" placeholder="Enter the title of the expense" onChange={(e)=>{addT(e.target.value)}}/>
        <input type="text" placeholder="Enter the amount of the expense" onChange={(e)=>{addCo(e.target.value)}}/>
        <input type="text" placeholder="Enter the category of the expense" onChange={(e)=>{addCat(e.target.value)}}/>
        <button className="btn" type="button" onClick={()=>{handleClick()}}>Add</button>

    </div>
  )
}

export default CreateExpense