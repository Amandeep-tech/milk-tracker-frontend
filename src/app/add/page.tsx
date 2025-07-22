"use client";
import MilkForm from "@/components/MilkForm";
import { useRouter } from "next/navigation";
import { addEntry } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AddPage() {
  const router = useRouter();

  const handleSubmit = async (data: {
    date: number;
    quantity: number;
    rate: number;
  }) => {
    try {
      const resp = await addEntry(data);
      if (resp?.error === 0) {
        router.push("/");
      } else {
        alert(resp?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/" className="text-blue-500 text-sm">
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-bold">Add Milk Entry</h1>
      </div>
      <MilkForm
        onSubmit={handleSubmit}
        initialData={{ date: "", quantity: 0, rate: 0 }}
      />
    </main>
  );
}
