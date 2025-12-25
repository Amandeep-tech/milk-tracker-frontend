"use client";
import { useEffect, useMemo, useState } from "react";
import {
  getAllMilkEntries,
  deleteEntry,
  getMilkDefaults,
  updateAutoMilkEntrySetting,
} from "@/lib/api";
import MilkTable from "@/components/MilkTable";
import Link from "next/link";
import { MilkDefaultsAPIResponse, MilkEntry } from "@/types/apiResponseTypes";
import { Poppins } from "next/font/google";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Summary from "@/components/summary";
import { toast, ToastContainer } from "react-toastify";
import Button from "@/components/basic/button";
import { CirclePause, Play, Plus } from "lucide-react";
import PinModal from "@/components/PinModal";
import Shimmer from "@/components/basic/shimmer";

const notifyFailedToDelete = () => toast.error("Failed to delete entry!");
const notifyFailedToFetchMilkDefaults = () =>
  toast.error("Failed to fetch milk defaults!");

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function HomePage() {
  const [milkEntriesLoading, setMilkEntriesLoading] = useState(false);

  const [entries, setEntries] = useState<MilkEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [milkDefaults, setMilkDefaults] = useState<
    MilkDefaultsAPIResponse["data"] | null
  >(null);
  const [playPauseBtnLoading, setPlayPauseBtnLoading] = useState(false);

  const [showPinModal, setShowPinModal] = useState(false);

  const isAutoMilkEntryEnabled = useMemo(
    () => milkDefaults?.auto_entry_enabled || false,
    [milkDefaults]
  );

  useEffect(() => {
    fetchMilkEntries();
  }, [selectedDate]); // Refetch when selected date changes

  useEffect(() => {
    fetchMilkDefaults();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("x-app-pin") === process.env.NEXT_PUBLIC_APP_PIN)
      return;
    setShowPinModal(true);
  }, []);

  const fetchMilkEntries = async () => {
    try {
      setMilkEntriesLoading(true);
      const yearMonth = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}`;
      setEntries([]);
      const resp = await getAllMilkEntries(yearMonth);
      if (resp?.error === 0 && resp?.data) {
        setEntries(resp.data);
      } else {
        setEntries([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMilkEntriesLoading(false);
    }
  };

  const fetchMilkDefaults = async () => {
    try {
      const resp = await getMilkDefaults();
      console.log("Milk defaults:", resp);
      if (resp?.error !== 0) {
        setMilkDefaults(null);
      } else if (resp?.data) {
        setMilkDefaults(resp?.data);
      }
    } catch (err) {
      console.error(err);
      notifyFailedToFetchMilkDefaults();
    }
  };

  const handleDelete = async (id: number) => {
    const updatedEntries = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, deleteBtnLoading: true };
      }
      return entry;
    });
    setEntries(updatedEntries);
    try {
      const resp = await deleteEntry(id.toString());
      if (resp?.error === 0) {
        // clearing the entries to show loading state while refetching
        setEntries([]);
        fetchMilkEntries();
      } else {
        notifyFailedToDelete();
      }
    } catch (error) {
      console.error(error);
      notifyFailedToDelete();
    }
  };

  const loadHomePageData = async () => {
    Promise.all([fetchMilkEntries(), fetchMilkDefaults()]);
  };

  const handlePlayPauseBtnClick = async () => {
    try {
      const payload = {
        autoMilkEntryEnabled: !isAutoMilkEntryEnabled,
      };
      setPlayPauseBtnLoading(true);
      const resp = await updateAutoMilkEntrySetting(payload);
      setPlayPauseBtnLoading(false);
      if (resp?.error === 0 && resp?.data) {
        setMilkDefaults(resp.data);
        if (resp.data.auto_entry_enabled) {
          toast("Auto milk entry activated!");
        } else {
          toast("Auto milk entry deactivated!");
        }
      } else {
        toast("Failed to update auto milk entry setting!");
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  return (
    <main className={`p-4 ${poppins.className}`}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
      />
      {showPinModal && (
        <PinModal
          onSuccess={() => {
            setShowPinModal(false);
            loadHomePageData();
          }}
        />
      )}
      <h1 className={`text-2xl font-bold mb-4 text-center`}>
        🥛Milk Tracker🥛
      </h1>
      <div className="flex items-center gap-4 mb-4">
        <Link
          href="/add"
          className="
          btn-responsive
          hover:bg-blue-600 hover:text-white text-black border border-gray-300 min-w-[5rem] rounded-[6px]"
        >
          <Plus className="btn-icon w-4 h-4 inline" /> Add Entry
        </Link>
      </div>
      {milkDefaults ? (
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="normal"
            className="hover:bg-blue-600 hover:text-white text-black border border-gray-300"
            onClick={handlePlayPauseBtnClick}
            loading={playPauseBtnLoading}
            disabled={playPauseBtnLoading}
          >
            {isAutoMilkEntryEnabled ? (
              <div className="flex justify-center items-center gap-2 flex-wrap">
                <CirclePause className="w-4 h-4" />
                <span>Deactivate Auto Milk Entry</span>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2 flex-wrap">
                <Play className="w-4 h-4" />{" "}
                <span>Activate Auto Milk Entry</span>
              </div>
            )}
          </Button>
        </div>
      ) : (
        <Shimmer width="220px" height="50px" />
      )}
      <Summary />
      <div className="p-2 rounded-[6px] flex items-center justify-between flex-wrap border border-gray-300 gap-2 mt-4 max-w-[324px]">
        <div className="text-sm font-medium">Month :</div>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => date && setSelectedDate(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="p-1 border border-gray-300 rounded-[6px] cursor-pointer text-sm"
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
