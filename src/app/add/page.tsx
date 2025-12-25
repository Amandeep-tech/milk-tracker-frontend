"use client";
import MilkForm from "@/components/MilkForm";
import { useRouter } from "next/navigation";
import { addEntry, getMilkDefaults } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Shimmer from "@/components/basic/shimmer";

const message = "Milk entry already exists for this date!";

export default function AddPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState<{
    date: string;
    quantity: number;
    rate: number;
    loaded: boolean;
  }>({
    date: "",
    quantity: 1,
    rate: 48, // default rate as of now
    loaded: false,
  });
  const notify = () => toast(message);

  useEffect(() => {
    void fetchMilkDefaults();
  }, []);

  const fetchMilkDefaults = async () => {
    try {
      const resp = await getMilkDefaults();
      if (resp?.error === 0 && resp.data) {
        // set initial rate from defaults
        if (resp.data) {
          initialData.rate = resp.data.rate;
          initialData.quantity = resp.data.quantity;
          initialData.loaded = true;
          setInitialData({ ...initialData });
        }
      }
    } catch (error) {
      console.error("Failed to fetch milk defaults:", error);
    }
  };

  const handleSubmit = async (data: {
    date: number;
    quantity: number;
    rate: number;
    notes?: string;
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
      <div className="flex items-center gap-2 mb-4">
        <Link href="/" className="text-blue-500 text-sm">
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-bold">Add Milk Entry</h1>
      </div>
      {initialData.loaded ? <MilkForm
        onSubmit={handleSubmit}
        initialData={initialData}
        isLoading={isLoading}
      /> : (
        <div>
          <Shimmer width="300px" height="50px" className="rounded mb-2" />
          <Shimmer width="300px" height="50px" className="rounded mb-2" />
          <Shimmer width="300px" height="50px" className="rounded mb-2" />
        </div>
      )}
    </main>
  );
}
