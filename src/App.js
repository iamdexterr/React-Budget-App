import { Button, Stack } from "react-bootstrap";
import { Container } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from './components/AddBudgetModal'; 
import AddExpenseModal from './components/AddExpenseModal'; 
import ViewExpensesModal from './components/ViewExpensesModal'; 
import {useState} from 'react';
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import { useBudget, UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetContext";



function App() {

  const [showAddBudgetModal,setShowAddBudgetModal]= useState(false);
  const [showAddExpenseModal,setShowAddExpenseModal]= useState(false);
  const [viewExpensesModalBudgetId,setViewExpensesModalBudgetId]= useState();
  const [addExpenseModalBudgetId,setAddExpenseModalBudgeId]= useState();
  const {budgets,getBudgetExpenses} = useBudget();


  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgeId(budgetId)
  }

  return (<>
    <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
            <h1 className="me-auto">Budgets</h1>
            <Button variant="primary" onClick={()=>{setShowAddBudgetModal(true)}}>Add Budget</Button>
            <Button variant="outline-primary"  onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
          gap :"1rem",
          alignItems: 'flex-start'
        }}>

          {budgets.map(budget=>{
              const expense = getBudgetExpenses(budget.id).reduce((total,expense)=>{
                return total = total + expense.amount
              },0)
            return (
              
              <BudgetCard
              key={budget.id}
              name={budget.name} 
              gray 
              amount={expense}
              max={budget.max}
              id={budget.id}
              onAddExpenseClick={openAddExpenseModal}
              onViewExpensesClick={()=>{setViewExpensesModalBudgetId(budget.id)}}
                 />
            )
          })}
          
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpensesClick={()=>{setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}}/>
          <TotalBudgetCard />
       </div>
    </Container>
    <AddBudgetModal show={showAddBudgetModal} handleClose={()=>{setShowAddBudgetModal(false)}}/>
    <AddExpenseModal show={showAddExpenseModal} handleClose={()=>{setShowAddExpenseModal(false)}} defaultBudgetId={addExpenseModalBudgetId}/>
    <ViewExpensesModal  handleClose={()=>setViewExpensesModalBudgetId()} budgetId={viewExpensesModalBudgetId}/>
    </>
    
  );
}

export default App;
