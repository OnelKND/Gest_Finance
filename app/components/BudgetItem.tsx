import { Budget } from "@/type";
import React from "react";

interface BudgetItemProps {
    budget: Budget;
    enableHover? : number;
}
const BudgetItem: React.FC<BudgetItemProps> = ({ budget ,enableHover }) => {
    const transactionCount = budget.transactions ? budget.transactions.length : 0;
    const totalTransactionsAmount = budget.transactions
    ?budget.transactions.reduce((sum , transaction) => sum + transaction.amount , 0 ):0

    const remainingAmount = budget.amount - totalTransactionsAmount
    const progressValue = totalTransactionsAmount >budget.amount?100
    :(totalTransactionsAmount /budget.amount)*100

    const hoverClasse = enableHover === 1? "hover:shadow-xl hover:border-accent"
    :""; 


    return (
        <li className={`p-4 rounded-xl border-base-300 border-2 list-none ${hoverClasse}`} key={budget.id}> 
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-accent/20 text-xl h-15 w-15 rounded-full 
                    flex justify-center items-center">
                        {budget.emoji}
                    </div>
                    <div className="flex flex-col ml-3">
                        <span className="font-bold text-xl">{budget.name}</span>
                        <span className="text-grey-500 text-sm">{transactionCount} Transaction(s)</span>
                    </div>
                </div>

                <div className="text-xl font-bold text-accent">
                    {budget.amount} FCFA
                </div>
            </div>

            <div className="flex justify-between items-center mt-4 text-grey-500 text-sm">
                <span>{totalTransactionsAmount} FCFA dépensés</span>
                <span>{remainingAmount} FCFA restants</span>
            </div>
            <div>
            <progress className="progress progress-accent w-full mt-4" value={progressValue} max="100"></progress>
            </div>
        </li>
    )
};

export default BudgetItem;
