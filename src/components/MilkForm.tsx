import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './basic/button';

interface IMilkFormProps {
  onSubmit: (data: { date: number; quantity: number; rate: number }) => void;
  initialData: { date: string; quantity: number; rate: number };
  isLoading?: boolean;
}

export default function MilkForm(props: IMilkFormProps) {
  const { onSubmit, initialData, isLoading } = props;

  const [date, setDate] = useState<Date | null>(initialData.date ? new Date(initialData.date) : new Date());
  const [quantity, setQuantity] = useState(initialData.quantity || '');
  const [rate, setRate] = useState(initialData.rate || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date) {
      const epochTimestamp = date.getTime();
      onSubmit({ date: epochTimestamp, quantity: Number(quantity), rate: Number(rate) });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Date</label>
        <DatePicker 
        className="w-full p-2 border rounded max-w-[20rem]"
        dateFormat={"dd/MM/yyyy"}
        selected={date} 
        onChange={(date: Date | null) => setDate(date)}  />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="w-full p-2 border rounded max-w-[20rem]"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Rate</label>
        <input
          type="number"
          value={rate}
          onChange={e => setRate(e.target.value)}
          className="w-full p-2 border rounded max-w-[20rem]"
        />
      </div>
      <Button 
        type="submit" 
        className='w-[6rem]' 
        text="Submit" 
        variant="primary" 
        size="lg" 
        loading={isLoading} 
        disabled={isLoading || !date || !quantity || !rate}
      />
    </form>
  );
}