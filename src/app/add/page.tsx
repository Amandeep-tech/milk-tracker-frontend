"use client";
import MilkForm from "@/components/MilkForm";
import { useRouter } from "next/navigation";
import { addEntry } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddPage() {
  const router = useRouter();

  const handleSubmit = async (data: {
    date: string;
    quantity: number;
    rate: number;
  }) => {
    console.log(data);
    await addEntry(data);
    router.push("/");
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
