import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MobileHeader } from '@/components/MobileHeader';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { IncomeForm } from '@/components/IncomeForm';
import { IncomeList } from '@/components/IncomeList';
import { Expense, Income } from '@/types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);
  const [showIncomeDialog, setShowIncomeDialog] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedIncomes = localStorage.getItem('incomes');
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedIncomes) setIncomes(JSON.parse(savedIncomes));
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }, [expenses, incomes]);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense = { ...newExpense, id: crypto.randomUUID() };
    setExpenses([expense, ...expenses]);
    setShowExpenseDialog(false);
  };

  const handleAddIncome = (newIncome: Omit<Income, 'id'>) => {
    const income = { ...newIncome, id: crypto.randomUUID() };
    setIncomes([income, ...incomes]);
    setShowIncomeDialog(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleDeleteIncome = (id: string) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleEditIncome = (income: Income) => {
    setEditingIncome(income);
  };

  const handleUpdateExpense = (updatedExpense: Omit<Expense, 'id'>) => {
    if (editingExpense) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === editingExpense.id
            ? { ...updatedExpense, id: expense.id }
            : expense
        )
      );
      setEditingExpense(null);
    }
  };

  const handleUpdateIncome = (updatedIncome: Omit<Income, 'id'>) => {
    if (editingIncome) {
      setIncomes(
        incomes.map((income) =>
          income.id === editingIncome.id
            ? { ...updatedIncome, id: income.id }
            : income
        )
      );
      setEditingIncome(null);
    }
  };

  return (
    <div className="layout-container">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddExpense={() => setShowExpenseDialog(true)}
        onAddIncome={() => setShowIncomeDialog(true)}
      />

      <div className="main-content">
        <MobileHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddExpense={() => setShowExpenseDialog(true)}
          onAddIncome={() => setShowIncomeDialog(true)}
        />

        <main className="p-6">
          {activeTab === 'dashboard' && (
            <Dashboard expenses={expenses} incomes={incomes} />
          )}
          
          {activeTab === 'expenses' && (
            <ExpenseList
              expenses={expenses}
              onDelete={handleDeleteExpense}
              onEdit={handleEditExpense}
            />
          )}
        </main>

        <Dialog open={showExpenseDialog} onOpenChange={setShowExpenseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Expense</DialogTitle>
            </DialogHeader>
            <ExpenseForm onSubmit={handleAddExpense} />
          </DialogContent>
        </Dialog>

        <Dialog open={showIncomeDialog} onOpenChange={setShowIncomeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Income</DialogTitle>
            </DialogHeader>
            <IncomeForm onSubmit={handleAddIncome} />
          </DialogContent>
        </Dialog>

        {editingExpense && (
          <Dialog open={!!editingExpense} onOpenChange={() => setEditingExpense(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Expense</DialogTitle>
              </DialogHeader>
              <ExpenseForm onSubmit={handleUpdateExpense} />
            </DialogContent>
          </Dialog>
        )}

        {editingIncome && (
          <Dialog open={!!editingIncome} onOpenChange={() => setEditingIncome(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Income</DialogTitle>
              </DialogHeader>
              <IncomeForm onSubmit={handleUpdateIncome} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default App;