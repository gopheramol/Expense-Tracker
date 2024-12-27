import { Menu, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';

interface MobileHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddExpense: () => void;
  onAddIncome: () => void;
}

export function MobileHeader({ activeTab, onTabChange, onAddExpense, onAddIncome }: MobileHeaderProps) {
  return (
    <div className="mobile-header">
      <div className="flex items-center gap-2">
        <Wallet className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Expense Tracker</h1>
      </div>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar
            activeTab={activeTab}
            onTabChange={onTabChange}
            onAddExpense={onAddExpense}
            onAddIncome={onAddIncome}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}