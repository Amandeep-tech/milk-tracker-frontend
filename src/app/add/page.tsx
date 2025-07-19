'use client';
import MilkForm from '@/components/MilkForm';
import { useRouter } from 'next/navigation';
import { addEntry } from '@/lib/api';

export default function AddPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    console.log(data);
    await addEntry(data);
    router.push('/');
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Milk Entry</h1>
      <MilkForm onSubmit={handleSubmit} />
    </main>
  );
}