import { useEffect, useState } from "react";
import CreateExpense from "./CreateExpense";
import axios from "axios";
import "./DisplayExpense.css";
interface e {
  title: string;
  cost: string;
  category: string;
}
interface c {
  category: string;
  total: string;
}
const DisplayExpense = () => {
  const [expense, setExpense] = useState<e[]>([]);
  const [cat, setCat] = useState<c[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3003/get")
      .then((result) => setExpense(result.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3003/totals")
      .then((result) => setCat(result.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="body">
      <h1>Expenses Report</h1>
      <CreateExpense />
      <div className="row">
        {expense.length === 0 ? (
          <div>No expenses</div>
        ) : (
          expense.map((exp) => (
            <div className="container1">
              <div className="title">Title: {exp.title}</div>
              <div className="cost">Cost: {exp.cost}</div>
              <div className="category">Category: {exp.category}</div>
            </div>
          ))
        )}
      </div>
      <div className="row">
        {cat.map((category) => (
          <div className="container2">
            <div className="cat">Category:{category.category}</div>
            <div className="total">Total: {category.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayExpense;
