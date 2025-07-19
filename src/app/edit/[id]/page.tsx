'use client';
import { useEffect, useState } from 'react';
import { getEntryById, updateEntry } from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';
import MilkForm from '@/components/MilkForm';
import { MilkEntry } from '@/types/apiResponseTypes';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const [entry, setEntry] = useState<MilkEntry | null>(null);

  useEffect(() => {
    async function fetchEntry() {
      const data = await getEntryById(params.id as string);
      if (data.error === 0 && data.data) {
        setEntry(data.data);
      } else {
        router.push('/');
      }
    }
    fetchEntry();
    // TODO: check if these dependencies are needed
  }, [params.id, router]);

  const handleSubmit = async (updatedData: { date: string; quantity: number; rate: number }) => {
    await updateEntry(params.id as string, updatedData);
    router.push('/');
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/" className="text-blue-500 text-sm">
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-bold">Edit Entry</h1>
      </div>
      {entry && <MilkForm onSubmit={handleSubmit} initialData={entry} />}
    </main>
  );
}