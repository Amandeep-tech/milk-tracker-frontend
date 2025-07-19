import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function MilkForm({ onSubmit, initialData = { date: '', quantity: 0, rate: 0 } }: {
  onSubmit: (data: { date: string; quantity: number; rate: number }) => void;
  initialData: { date: string; quantity: number; rate: number };
}) {
  const [date, setDate] = useState<Date | null>(initialData.date ? new Date(initialData.date) : new Date());
  const [quantity, setQuantity] = useState(initialData.quantity || '');
  const [rate, setRate] = useState(initialData.rate || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date) {
      onSubmit({ date: date.toISOString().split('T')[0], quantity: Number(quantity), rate: Number(rate) });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Date</label>
        <DatePicker selected={date} onChange={(date: Date | null) => setDate(date)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block mb-1">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Rate</label>
        <input
          type="number"
          value={rate}
          onChange={e => setRate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}