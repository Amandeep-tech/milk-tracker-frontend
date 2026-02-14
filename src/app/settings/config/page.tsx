"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/basic/button";
import { toast } from "react-toastify";
import { getMilkDefaults, updateMilkDefaults } from "@/lib/api";
import Shimmer from "@/components/basic/shimmer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const Settings = () => {
  const [quantity, setQuantity] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [autoEntryEnabled, setAutoEntryEnabled] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchDefaults();
  }, []);

  const fetchDefaults = async () => {
    try {
      setIsLoading(true);
      const resp = await getMilkDefaults();

      if (resp?.error === 0 && resp?.data) {
        setQuantity(String(resp.data.quantity ?? ""));
        setRate(String(resp.data.rate ?? ""));
        setAutoEntryEnabled(Boolean(resp.data.auto_entry_enabled));
      } else {
        toast.error("Failed to load defaults");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch milk defaults");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!quantity || !rate) {
      toast.error("Quantity and Rate are required");
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        quantity: Number(quantity),
        rate: Number(rate),
        autoMilkEntryEnabled: autoEntryEnabled,
      };

      const resp = await updateMilkDefaults(payload);

      if (resp?.error === 0) {
        toast.success("Milk defaults updated successfully");
      } else {
        toast.error("Failed to update defaults");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/" className="text-blue-500 text-sm">
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-bold">Milk Defaults</h1>
      </div>

      {isLoading ? (
        <div className="text-center text-sm text-gray-500">
          Loading default data...
          <Shimmer width="250px" height="50px" className="mb-2" />
          <Shimmer width="250px" height="50px" className="mb-2" />
          <Shimmer width="250px" height="50px" className="mb-2" />
        </div>
      ) : (
        <>
          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-sm mb-1">
              Default Quantity (Litres)
            </label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => {
                const val = e.target.value;
                // allow only numbers and decimal point
                if (/^\d*\.?\d*$/.test(val)) {
                  setQuantity(val);
                }
              }}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Rate */}
          <div className="mb-4">
            <label className="block text-sm mb-1">
              Default Rate (₹ per litre)
            </label>
            <input
              type="text"
              value={rate}
              onChange={(e) => {
                const val = e.target.value;
                // allow only numbers and decimal point
                if (/^\d*\.?\d*$/.test(val)) {
                  setRate(val);
                }
              }}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Toggle */}
          <div className="mb-6 flex items-center gap-3 bg-gray-50 p-3 rounded-md max-w-[16rem]">
            <input
              type="checkbox"
              id="check_box"
              checked={autoEntryEnabled}
              onChange={(e) => setAutoEntryEnabled(e.target.checked)}
              className="h-4 w-4 cursor-pointer"
            />
            <label htmlFor="check_box" className="text-sm cursor-pointer">Enable Auto Milk Entry</label>
          </div>

          <Button
            text="Save Changes"
            variant="primary"
            disabled={isSaving}
            loading={isSaving}
            onClick={handleSave}
          />
        </>
      )}
    </div>
  );
};

export default Settings;
