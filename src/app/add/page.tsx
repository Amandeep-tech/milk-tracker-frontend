"use client";
import MilkForm from "@/components/MilkForm";
import { useRouter } from "next/navigation";
import { addEntry } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const message = "Milk entry already exists for this date!";

const initialData = {
  date: "",
  quantity: 1,
  rate: 48, // TODO: will set this in config API in future
}

export default function AddPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const notify = () => toast(message);

  const handleSubmit = async (data: {
    date: number;
    quantity: number;
    rate: number;
  }) => {
    try {
      setIsLoading(true);
      const resp = await addEntry(data);
      if (resp?.error === 0) {
        router.push("/");
      } else {
        // notify with toast
        notify();
      }
    } catch (error) {
      console.error(error);
      notify();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
      />
      <div className="flex items-center gap-2 mb-4">
        <Link href="/" className="text-blue-500 text-sm">
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-bold">Add Milk Entry</h1>
      </div>
      <MilkForm
        onSubmit={handleSubmit}
        initialData={initialData}
        isLoading={isLoading}
      />
    </main>
  );
}
