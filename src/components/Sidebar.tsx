import { Wallet, PlusCircle, Banknote, LayoutDashboard, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddExpense: () => void;
  onAddIncome: () => void;
}

export function Sidebar({ activeTab, onTabChange, onAddExpense, onAddIncome }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="flex items-center gap-2 mb-8">
        <Wallet className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Expense Tracker</h1>
      </div>

      <div className="space-y-2">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start',
            activeTab === 'dashboard' && 'bg-secondary'
          )}
          onClick={() => onTabChange('dashboard')}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start',
            activeTab === 'expenses' && 'bg-secondary'
          )}
          onClick={() => onTabChange('expenses')}
        >
          <Receipt className="mr-2 h-4 w-4" />
          Expenses
        </Button>
      </div>

      <div className="mt-auto space-y-2">
        <Button className="w-full" onClick={onAddExpense}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
        <Button variant="outline" className="w-full" onClick={onAddIncome}>
          <Banknote className="mr-2 h-4 w-4" />
          Add Income
        </Button>
      </div>
    </div>
  );
}