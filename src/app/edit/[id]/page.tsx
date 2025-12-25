"use client";
import { useEffect, useState } from "react";
import { getEntryById, updateEntry } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import MilkForm from "@/components/MilkForm";
import { MilkEntry } from "@/types/apiResponseTypes";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Shimmer from "@/components/basic/shimmer";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const [entry, setEntry] = useState<MilkEntry | null>(null);
  const [loadingEntry, setLoadingEntry] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchEntry() {
      try {
        setLoadingEntry(true);
        const data = await getEntryById(params.id as string);
        if (data.error === 0 && data.data) {
          setEntry(data.data);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        router.push("/");
      } finally {
        setLoadingEntry(false);
      }
    }
    fetchEntry();
    // TODO: check if these dependencies are needed
  }, [params.id, router]);

  const handleSubmit = async (updatedData: {
    date: number;
    quantity: number;
    rate: number;
    notes?: string;
  }) => {
    try {
      setIsSubmitting(true);
      const resp = await updateEntry(params.id as string, updatedData);
      if (resp?.error === 0) {
        router.push("/");
      } else {
        alert(resp?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/" className="text-blue-500 text-sm">
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-bold">Edit Entry</h1>
      </div>
      {entry ? (
        <MilkForm
          onSubmit={handleSubmit}
          initialData={entry}
          isLoading={isSubmitting}
        />
      ) : (
        <div>
          <Shimmer width="300px" height="50px" className="rounded mb-2" />
          <Shimmer width="300px" height="50px" className="rounded mb-2" />
          <Shimmer width="300px" height="50px" className="rounded mb-2" />
        </div>
      )}
    </main>
  );
}
