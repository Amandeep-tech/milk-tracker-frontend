import { useState, useRef, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './basic/button';

interface IMilkFormProps {
  onSubmit: (data: { date: number; quantity: number; rate: number, notes: string }) => void;
  initialData: { date: string; quantity: number; rate: number; notes?: string };
  isLoading?: boolean;
}

export default function MilkForm(props: IMilkFormProps) {
  const { onSubmit, initialData, isLoading } = props;

  const [date, setDate] = useState<Date | null>(initialData.date ? new Date(initialData.date) : new Date());
  const [quantity, setQuantity] = useState(initialData.quantity || '');
  const [rate, setRate] = useState(initialData.rate || '');
  const notes = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if(initialData.rate) {
      setRate(initialData.rate);
    }
  }, [initialData.rate]);

  useEffect(()=> {
    if(initialData.notes && notes.current) {
      notes.current.value = initialData.notes;
    }
  }, [initialData.notes])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date) {
      const epochTimestamp = date.getTime();
      onSubmit({ date: epochTimestamp, quantity: Number(quantity), rate: Number(rate), notes: notes.current?.value || '' });
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
          type="text"
          value={quantity}
          onChange={e => {
            const val = e.target.value;
            // allow only numbers and decimal point
            if (/^\d*\.?\d*$/.test(val)) {
              setQuantity(val);
            }
          }}
          className="w-full p-2 border rounded max-w-[20rem]"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Rate</label>
        <input
          type="text"
          value={rate}
          onChange={e => {
            const val = e.target.value;
            // allow only numbers and decimal point
            if (/^\d*\.?\d*$/.test(val)) {
              setRate(val);
            }
          }}
          className="w-full p-2 border rounded max-w-[20rem]"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Notes (optional)</label>
        <textarea
          ref={notes}
          className="w-full p-2 border rounded max-w-[20rem]"
          rows={2}
        />
      </div>
      <Button 
        type="submit" 
        className='w-[6rem] cursor-pointer hover:bg-blue-500 hover:text-black transition-colors duration-200' 
        text="Submit" 
        variant="primary" 
        size="lg" 
        loading={isLoading} 
        disabled={isLoading || !date || !quantity || !rate}
      />
    </form>
  );
}