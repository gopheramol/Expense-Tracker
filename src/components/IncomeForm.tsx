import { useState } from 'react';
import { Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Income } from '@/types';

interface IncomeFormProps {
  onSubmit: (income: Omit<Income, 'id'>) => void;
}

export function IncomeForm({ onSubmit }: IncomeFormProps) {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount),
      source,
      date: new Date().toISOString(),
    });
    setAmount('');
    setSource('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="income-amount">Amount</Label>
        <Input
          id="income-amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="source">Source</Label>
        <Input
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Enter income source"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        <Banknote className="mr-2 h-4 w-4" />
        Add Income
      </Button>
    </form>
  );
}