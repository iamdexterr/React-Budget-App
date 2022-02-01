import React, {useContext,useState} from 'react';
import {v4 as uidV4} from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetContext = React.createContext();

export const useBudget = ()=>{
    return useContext(BudgetContext);
}

export const UNCATEGORIZED_BUDGET_ID ="Uncategorized";


export const BudgetProvider =({children})=>{

    const [budgets,setBudgets] =useLocalStorage('budgets',[]);
    const [expenses,setExpenses] =useLocalStorage('expenses',[]);

    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({description,amount,budgetId}){
        setExpenses(prevExpenses=> {

           return( [...prevExpenses,{
            id:uidV4(),
            description,
            amount,
            budgetId}
        ])
     })
    }

    function addBudget({name,max}){
        setBudgets(prevBudget=> {
            
            if(prevBudget.find(budget=> budget.name ===name)){
                return prevBudget;
            }
            
           return( [...prevBudget,{
            id:uidV4(),
            name,
            max}
        ])
     })
    }

    function deleteBudget({id}){
        setExpenses(prevExpenses=>{
            return prevExpenses.map(expense=>{
                if(expense.budgetId!== id) return expense
                return {...expense,budgetId: UNCATEGORIZED_BUDGET_ID}
            })
        })

        setBudgets(prevBudgets =>{
            return prevBudgets.filter(prevBudget=> prevBudget.id !== id)  
        })
    }   

    function deleteExpense({id}){
        setExpenses(prevExpenses =>{
            return prevExpenses.filter(prevExpense=> prevExpense.id !== id)
        })
    }

    return (
    <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        {children}
    </BudgetContext.Provider>)
}