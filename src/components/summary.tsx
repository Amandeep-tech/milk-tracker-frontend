import React, { useEffect, useState } from "react";
import Accordion from "./basic/accordion";
import Shimmer from "./basic/shimmer";
import { SummaryForYearMonth } from "@/types/apiResponseTypes";
import { getSummaryForYearMonth, markAsPaid } from "@/lib/api";
import DatePicker from "react-datepicker";
import { Check, X } from "lucide-react";
import Button from "./basic/button";

const Summary = () => {
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryForYearMonth | null>(null);
  const [summaryDate, setSummaryDate] = useState<Date>(new Date());
	const [markAsPaidLoading, setMarkAsPaidLoading] = useState(false);

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

	const handleMarkAsPaid = async () => {
		try {
			setMarkAsPaidLoading(true);
			const yearMonth = `${summaryDate.getFullYear()}-${String(
				summaryDate.getMonth() + 1
			).padStart(2, "0")}`;
			// TODO: get notes from user
			if(!summary?.totalAmount) {
				alert("No amount to pay");
				return;
			}
			const resp = await markAsPaid(yearMonth, summary?.totalAmount || 0, "Paid by me");
			if (resp?.error === 0 && resp?.data) {
				await fetchSummaryForYearMonth();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setMarkAsPaidLoading(false);
		}
	}

  useEffect(() => {
    fetchSummaryForYearMonth();
  }, [summaryDate]);

  const contentForSummary = () => {
    return (
      <>
        <div className="flex items-center justify-between flex-wrap gap-2 mt-4">
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
                          <p className="text-sm font-semibold">{key}</p>
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
				<div className="border-t border-gray-300 my-2"/>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between gap-2">
            <p className="text-sm font-semibold">Total Quantity</p>
            <p className="text-sm">{summary?.totalQuantity || 0} Litres</p>
          </div>
          <div className="flex flex-row justify-between gap-2">
            <p className="text-sm font-semibold">Total Amount</p>
            <p className="text-sm">₹ {summary?.totalAmount || 0}</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
            <p className="text-sm font-semibold">Amount Paid ? </p>
            <p className="text-sm">
              {summary?.paymentDone ? 
								<Check size={20} className="text-green-500 font-bold" /> 
								: 
								<X size={20} className="text-red-500 font-bold"	 />}
            </p>
          </div>
          {summary &&!summary?.paymentDone && summary?.totalAmount !== 0 && (
            <div className="flex flex-row justify-end mt-2">
              <Button 
								text="Mark as paid" 
								className="text-xs min-w-[6rem] py-1" 
								variant="primary" 
								onClick={handleMarkAsPaid} 
								loading={markAsPaidLoading}
							/>
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <div className="summary-container border border-gray-300 rounded-md p-2 mt-4 max-w-[20rem]">
      <Accordion
        open={false}
        heading="Month wise summary"
        content={contentForSummary()}
      />
    </div>
  );
};

export default Summary;
