"use client";
import { useEffect, useState } from "react";
import {
  getAllMilkEntries,
  deleteEntry,
} from "@/lib/api";
import MilkTable from "@/components/MilkTable";
import Link from "next/link";
import { MilkEntry } from "@/types/apiResponseTypes";
import { Poppins } from "next/font/google";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Summary from "@/components/summary";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function HomePage() {
  const [milkEntriesLoading, setMilkEntriesLoading] = useState(false);

  const [entries, setEntries] = useState<MilkEntry[]>([]);


  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      setMilkEntriesLoading(true);
      const yearMonth = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}`;
      const resp = await getAllMilkEntries(yearMonth);
      if (resp?.error === 0 && resp?.data) {
        // Filter entries for selected month and year
        const filteredEntries = resp.data.filter((entry) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getMonth() === selectedDate.getMonth() &&
            entryDate.getFullYear() === selectedDate.getFullYear()
          );
        });
        setEntries(filteredEntries);
      } else {
        setEntries([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMilkEntriesLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]); // Refetch when selected date changes

  const handleDelete = async (id: number) => {
    await deleteEntry(id.toString());
    fetchData();
  };

  return (
    <main className={`p-4 ${poppins.className}`}>
      <h1 className={`text-xl font-bold mb-4`}>Milk Tracker 🥛🥛</h1>
      <div className="flex items-center gap-4 mb-4">
        <Link
          href="/add"
          className="bg-blue-500 text-white px-4 py-2 rounded text-xs min-w-[5rem]"
        >
          Add Entry
        </Link>
      </div>
      <Summary />
      <div className="flex items-center justify-between flex-wrap gap-2 mt-4 max-w-[324px]">
        <label className="text-sm font-medium">Month :</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => date && setSelectedDate(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="p-1 border rounded text-sm"
        />
      </div>
      <div className="mt-4 w-full overflow-x-auto max-w-full overflow-hidden">
        <MilkTable
          entries={entries}
          onDelete={handleDelete}
          isLoading={milkEntriesLoading}
        />
      </div>
    </main>
  );
}
