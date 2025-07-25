import React, { useEffect, useState } from "react";
import Accordion from "./basic/accordion";
import Shimmer from "./basic/shimmer";
import { SummaryForYearMonth } from "@/types/apiResponseTypes";
import { getSummaryForYearMonth } from "@/lib/api";
import DatePicker from "react-datepicker";

const Summary = () => {
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryForYearMonth | null>(null);
  const [summaryDate, setSummaryDate] = useState<Date>(new Date());

  const fetchSummaryForYearMonth = async () => {
    try {
      setSummaryLoading(true);
      const yearMonth = `${summaryDate.getFullYear()}-${String(
        summaryDate.getMonth() + 1
      ).padStart(2, "0")}`;
      const resp = await getSummaryForYearMonth(yearMonth);
      console.log(resp);
      if (resp?.error === 0 && resp?.data) {
        setSummary(resp.data);
      } else {
        setSummary(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaryForYearMonth();
  }, [summaryDate]);

  const contentForSummary = () => {
    return (
      <>
        <div className="flex items-center gap-2 mt-4">
          <label className="text-sm font-medium">Summary for :</label>
          <DatePicker
            selected={summaryDate}
            onChange={(date: Date | null) => date && setSummaryDate(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="p-1 border rounded text-sm"
          />
        </div>

        <div>
          {summaryLoading ? (
            <div className="mt-4">
              <Shimmer width="40px" height="20px" className="mb-2" />
              <Shimmer width="40px" height="20px" className="mb-2" />
            </div>
          ) : (
            <div className="mt-4">
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  {Object.entries(summary?.summary || {}).map(
                    ([key, value]) => {
                      return (
                        <div key={key} className="flex flex-row gap-2">
                          <p className="text-sm font-medium">{key}</p>
                          {" - "}
                          <p className="text-sm">{value}</p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <div className="summary-container border border-gray-300 rounded-md p-2 mt-4">
      <Accordion
        open={false}
        heading="Month wise summary"
        content={contentForSummary()}
      />
    </div>
  );
};

export default Summary;
