import { MilkEntry } from "@/types/apiResponseTypes";
import Link from "next/link";
import Shimmer from "./basic/shimmer";
import Button from "./basic/button";
import { Edit, Trash } from "lucide-react";

export default function MilkTable({
  entries,
  onDelete,
  isLoading,
}: {
  entries: MilkEntry[];
  onDelete: (id: number) => void;
  isLoading?: boolean;
}) {
  const totalColumns = 5
  return (
    <table className="w-full text-sm border-collapse border border-gray-300 rounded-md">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border border-gray-300 min-w-[100px]">Date</th>
          <th className="p-2 border border-gray-300">Quantity (L)</th>
          <th className="p-2 border border-gray-300">Rate (₹/L)</th>
          {/* <th className="p-2 border border-gray-300">Total Amount (₹)</th> */}
          <th className="p-2 border border-gray-300 min-w-[100px]">Edit</th>
          <th className="p-2 border border-gray-300 min-w-[100px]">Delete</th>
        </tr>
      </thead>
      <tbody>
        {isLoading && 
        // show 5 loading rows
          Array.from({ length: 5 }).map((_, index) => (
          <tr key={index}>
            {Array.from({ length: totalColumns }).map((_, index) => (
              <td key={index} className="p-2 border border-gray-300 text-center">
                <Shimmer width="50px" height="20px" />
              </td>
            ))}
          </tr>)
        )}
        {!isLoading && entries?.length === 0 && (
          <tr>
            <td colSpan={totalColumns} className="text-center p-4">
              No entries found
            </td>
          </tr>
        )}
        {entries?.map((entry: MilkEntry) => (
          <tr key={entry.id} className="border-b min-h-[80px]">
            <td className="p-2 border border-gray-300 text-nowrap">
              {new Date(entry.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </td>
            <td className="p-2 border border-gray-300 text-center">{entry.quantity}</td>
            <td className="p-2 border border-gray-300 text-center">{entry.rate}</td>
            <td className="p-2 border border-gray-300 text-center">
              <Link
                href={`/edit/${entry.id}`}
                className="cursor-pointer 
                min-w-[25px]
                px-3 py-2 md:px-3 md:py-[8px] text-[10px] sm:text-[12px] md:text-[14px]
                text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <Edit className="w-3 h-3 md:w-4 md:h-4 inline" /> Edit
              </Link>
            </td>
            <td className="p-2 flex items-center justify-center">
              <Button
                onClick={() => onDelete(entry.id)}
                text="Delete"
                icon={<Trash className="w-3 h-3 md:w-4 md:h-4 inline" />}
                loading={entry.deleteBtnLoading}
                className="text-red-600 cursor-pointer border border-red-600 rounded-md  hover:bg-red-600 hover:text-white transition-colors duration-200 px-1 py-[6px] md:px-2 md:py-[7px] text-[10px] md:text-[12px] lg:text-[14px]"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
