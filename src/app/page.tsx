'use client';
import { useEffect, useState } from 'react';
import { getAllMilkEntries, deleteEntry } from '@/lib/api';
import MilkTable from '@/components/MilkTable';
import Link from 'next/link';
import { MilkEntry } from '@/types/apiResponseTypes';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export default function HomePage() {
  const [entries, setEntries] = useState<MilkEntry[]>([]);

  const fetchData = async () => {
    const data = await getAllMilkEntries();
    if (data.error === 0 && data.data) {
      setEntries(data.data);
    } else {
      setEntries([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteEntry(id.toString());
    fetchData();
  };

  return (
    <main className={`p-4 ${poppins.className}`}>
      <h1 className={`text-xl font-bold mb-4`}>Milk Tracker 🥛</h1>
      <Link href="/add" className="bg-blue-500 text-white px-4 py-2 rounded text-sm">Add Entry</Link>
      <div className="mt-4">
        <MilkTable entries={entries} onDelete={handleDelete} />
      </div>
    </main>
  );
}