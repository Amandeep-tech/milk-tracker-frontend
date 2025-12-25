"use client";
import Button from "@/components/basic/button";
import Shimmer from "@/components/basic/shimmer";
import { getMilkDefaults, saveVacationDates } from "@/lib/api";
import { MilkDefaultsAPIResponse } from "@/types/apiResponseTypes";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const Vacation = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [isSavingInProgress, setIsSavingInProgress] = useState(false);
  const [isResetInProgress, setIsResetInProgress] = useState(false);

	const [milkDefaults, setMilkDefaults] = useState<
			MilkDefaultsAPIResponse["data"] | null
		>(null);

  useEffect(() => {
    fetchMilkDefaults();
  }, []);

	const today = new Date().toISOString().split("T")[0];

	const isVacationModeEnabled = useMemo(() => {
		if(!milkDefaults?.vacation_from || !milkDefaults?.vacation_to) return false;
		return (
			today >= milkDefaults.vacation_from &&
			today <= milkDefaults.vacation_to
		);
	}, [milkDefaults, today]);

  const notifyVacationSaved = (msg?: string) =>
    toast.success(msg || "Vacation dates saved!");
  const notifyVacationSaveFailed = (err?: string) =>
    toast.error(err || "Failed to save vacation dates!");

  const fetchMilkDefaults = async () => {
    try {
      const resp = await getMilkDefaults();
      if (resp?.error === 0 && resp?.data) {
        setStartDate(resp.data.vacation_from ?? null);
        setEndDate(resp.data.vacation_to ?? null);
				setMilkDefaults(resp.data);
      }
    } catch {
      toast.error("Failed to fetch milk defaults!");
    } finally {
    }
  };

  const onSaveVacationDates = async () => {
    try {
      setIsSavingInProgress(true);
      const resp = await saveVacationDates(startDate, endDate);
      if (resp?.error === 0) {
        notifyVacationSaved();
      } else {
        notifyVacationSaveFailed();
      }
    } catch {
      notifyVacationSaveFailed();
    } finally {
      setIsSavingInProgress(false);
    }
  };

  const onResetClick = async () => {
    try {
      setIsResetInProgress(true);
      const resp = await saveVacationDates(null, null);
      if (resp?.error === 0) {
        setStartDate(null);
        setEndDate(null);
        notifyVacationSaved("Vacation dates reset!");
      } else {
        notifyVacationSaveFailed("Failed to reset vacation dates!");
      }
    } finally {
      setIsResetInProgress(false);
    }
  };


  return (
    <div className="p-3">
      <div className="mb-4 mt-4 font-bold text-center">Vacay Mode - {isVacationModeEnabled ? "🥳" : "😭"} </div>

      {/* Start Date */}
      {milkDefaults ? (
        <div className="mb-2 p-2 bg-gray-100 rounded-md">
          <span className="text-sm">Vacation Start Date</span>
          <input
            type="date"
            className="mt-2 w-full"
            value={startDate ?? ""}
            onChange={(e) => setStartDate(e.target.value || null)}
          />
        </div>
      ) : (
        <Shimmer width="350px" height="80px" className="mb-2 rounded" />
      )}

      {/* End Date */}
      {milkDefaults ? (
        <div className="mb-2 p-2 bg-gray-100 rounded-md">
          <span className="text-sm">Vacation End Date</span>
          <input
            type="date"
            className="mt-2 w-full"
            value={endDate ?? ""}
            onChange={(e) => setEndDate(e.target.value || null)}
          />
        </div>
      ) : (
        <Shimmer width="350px" height="80px" className="mb-2 rounded" />
      )}

      <div className="flex justify-center gap-3 mt-4">
        <Button
          text="Save Vacation Dates"
          variant="primary"
          disabled={!startDate || !endDate || isSavingInProgress}
          loading={isSavingInProgress}
          onClick={onSaveVacationDates}
        />

        <Button
          text="Reset"
          variant="outline"
          disabled={isResetInProgress}
          loading={isResetInProgress}
          onClick={onResetClick}
        />
      </div>
    </div>
  );
};

export default Vacation;
