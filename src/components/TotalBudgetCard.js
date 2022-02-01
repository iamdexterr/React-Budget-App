import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = (props) => {
    const {expenses,budgets }= useBudget();
    const amount = expenses.reduce((total,expense)=>{
        return total = total + expense.amount
      },0);

      const max = budgets.reduce((total,budget)=>{
        return total = total + budget.max
      },0)

      if(max ===0) return null;
  return (
      <BudgetCard gray name="Total" amount={amount} max={max} hideButtons/>
  )
};

export default TotalBudgetCard;
